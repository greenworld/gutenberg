/**
 * WordPress dependencies
 */
import { store as coreDataStore } from '@wordpress/core-data';

/**
 * Internal dependencies
 */
import { store as editorStore } from '../store';
import { unlock } from '../lock-unlock';

export default {
	name: 'core/post-meta',
	getValues( { registry, context, bindings } ) {
		const { getRegisteredPostMeta } = unlock(
			registry.select( coreDataStore )
		);
		const registeredFields = getRegisteredPostMeta(
			// TODO: Remove the fallback once postType is passed through the context.
			context?.postType ?? 'post'
		);
		const meta = registry
			.select( coreDataStore )
			.getEditedEntityRecord(
				'postType',
				context?.postType,
				context?.postId
			)?.meta;
		const newValues = {};
		for ( const [ attributeName, source ] of Object.entries( bindings ) ) {
			// Use the key if the value is not set.
			newValues[ attributeName ] =
				meta?.[ source.args.key ] ??
				registeredFields?.[ source.args.key ]?.label ??
				source.args.key;
		}
		return newValues;
	},
	setValues( { registry, context, bindings } ) {
		const newMeta = {};
		Object.values( bindings ).forEach( ( { args, newValue } ) => {
			newMeta[ args.key ] = newValue;
		} );
		registry
			.dispatch( coreDataStore )
			.editEntityRecord( 'postType', context?.postType, context?.postId, {
				meta: newMeta,
			} );
	},
	canUserEditValue( { select, context, args } ) {
		// Lock editing in query loop.
		if ( context?.query || context?.queryId ) {
			return false;
		}

		const postType =
			context?.postType || select( editorStore ).getCurrentPostType();

		// Check that editing is happening in the post editor and not a template.
		if ( postType === 'wp_template' ) {
			return false;
		}

		// Check that the custom field is not protected and available in the REST API.
		// Empty string or `false` could be a valid value, so we need to check if the field value is undefined.
		const fieldValue = select( coreDataStore ).getEntityRecord(
			'postType',
			postType,
			context?.postId
		)?.meta?.[ args.key ];

		if ( fieldValue === undefined ) {
			return false;
		}
		// Check that custom fields metabox is not enabled.
		const areCustomFieldsEnabled =
			select( editorStore ).getEditorSettings().enableCustomFields;
		if ( areCustomFieldsEnabled ) {
			return false;
		}

		// Check that the user has the capability to edit post meta.
		const canUserEdit = select( coreDataStore ).canUser( 'update', {
			kind: 'postType',
			name: context?.postType,
			id: context?.postId,
		} );
		if ( ! canUserEdit ) {
			return false;
		}

		return true;
	},
	getFieldsList( { registry, context } ) {
		let metaFields = {};
		const {
			type,
			is_custom: isCustom,
			slug,
		} = registry.select( editorStore ).getCurrentPost();
		const { getPostTypes, getEditedEntityRecord } =
			registry.select( coreDataStore );

		const { getRegisteredPostMeta } = unlock(
			registry.select( coreDataStore )
		);

		let postType = context?.postType ?? 'post';
		const isGlobalTemplate = isCustom || slug === 'index';
		// Inherit the postType from the slug if it is a template.
		if ( ! context?.postType && type === 'wp_template' ) {
			// Get the 'kind' from the start of the slug.
			// Use 'post' as the default.
			if ( ! isGlobalTemplate ) {
				const [ kind ] = slug.split( '-' );
				if ( kind === 'page' ) {
					postType = 'page';
				} else if ( kind === 'single' ) {
					const postTypes =
						getPostTypes( { per_page: -1 } )?.map(
							( entity ) => entity.slug
						) || [];

					// Infer the post type from the slug.
					// TODO: Review, as it may not have a post type. http://localhost:8888/wp-admin/site-editor.php?canvas=edit
					const match = slug.match(
						`^single-(${ postTypes.join( '|' ) })(?:-.+)?$`
					);
					postType = match ? match[ 1 ] : 'post';
				}
			}
		}
		const registeredMetaFields = getRegisteredPostMeta( postType );
		if ( type === 'wp_template' ) {
			// Populate the `metaFields` object with the default values.
			Object.entries( registeredMetaFields || {} ).forEach(
				( [ key, props ] ) => {
					// If the template is global, skip the fields with a subtype.
					// TODO: Add subtype to schema to be able to filter.
					if ( isGlobalTemplate && props.subtype ) {
						return;
					}
					metaFields[ key ] = props.default;
				}
			);
		} else {
			metaFields = getEditedEntityRecord(
				'postType',
				context?.postType,
				context?.postId
			).meta;
		}

		if ( ! metaFields || ! Object.keys( metaFields ).length ) {
			return null;
		}

		return Object.fromEntries(
			Object.entries( metaFields )
				// Remove footnotes or private keys from the list of fields.
				.filter(
					( [ key ] ) =>
						key !== 'footnotes' && key.charAt( 0 ) !== '_'
				)
				// Return object with label and value.
				.map( ( [ key, value ] ) => [
					key,
					{
						label: registeredMetaFields?.[ key ]?.label || key,
						value,
					},
				] )
		);
	},
};
