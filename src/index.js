import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element'; // Import Fragment from wp.element

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
