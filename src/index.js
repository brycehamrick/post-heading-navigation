import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl, ToggleControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element'; 
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';

// Register the Post Heading Navigation block
registerBlockType('custom/post-heading-navigation', {
    title: 'Post Heading Navigation',
    icon: 'list-view',
    category: 'widgets',
    attributes: {
        maxHeadingLevel: { type: 'number', default: 2 },
    },
    edit({ attributes, setAttributes }) {
        const { maxHeadingLevel } = attributes;

        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody title="Navigation Settings">
                        <SelectControl
                            label="Maximum Heading Level"
                            value={maxHeadingLevel}
                            options={[
                                { label: 'H2', value: 2 },
                                { label: 'H3', value: 3 },
                                { label: 'H4', value: 4 },
                            ]}
                            onChange={(newValue) =>
                                setAttributes({
                                    maxHeadingLevel: parseInt(newValue, 10),
                                })
                            }
                        />
                    </PanelBody>
                </InspectorControls>
                <div>{`Navigation Menu up to H${maxHeadingLevel}`}</div>
            </Fragment>
        );
    },
    save() {
        return null; // Server-rendered
    },
});

// Add new attributes to the core Heading block
function addHeadingAttributes(settings, name) {
    if (name === 'core/heading') {
        settings.attributes = {
            ...settings.attributes,
            navigationLabel: {
                type: 'string',
                default: '',
            },
            excludeFromNavigation: {
                type: 'boolean',
                default: false,
            },
        };
    }
    return settings;
}

// Add controls to the Heading block sidebar
const withInspectorControls = createHigherOrderComponent((BlockEdit) => {
    console.log("withInspectorControls is loading");
    return (props) => {
        if (props.name !== 'core/heading') return <BlockEdit {...props} />;

        const { attributes, setAttributes } = props;
        const { navigationLabel, excludeFromNavigation } = attributes;

        return (
            <Fragment>
                <BlockEdit {...props} />
                <InspectorControls>
                    <PanelBody title="Navigation Settings">
                        <TextControl
                            label="Navigation Label"
                            value={navigationLabel}
                            onChange={(value) => setAttributes({ navigationLabel: value })}
                            help="Custom text for this heading in the navigation."
                        />
                        <ToggleControl
                            label="Exclude from Navigation"
                            checked={excludeFromNavigation}
                            onChange={(value) => setAttributes({ excludeFromNavigation: value })}
                        />
                    </PanelBody>
                </InspectorControls>
            </Fragment>
        );
    };
}, 'withInspectorControls');

// Register filters to extend the Heading block
addFilter(
    'blocks.registerBlockType',
    'custom/heading-attributes',
    addHeadingAttributes
);
addFilter(
    'editor.BlockEdit',
    'custom/with-inspector-controls',
    withInspectorControls
);
