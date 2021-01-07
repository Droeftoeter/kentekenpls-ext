import React, { Children } from 'react';
import styled from 'styled-components';

type SpecificationProps = JSX.IntrinsicElements["div"] & {
    label:      React.ReactNode
    separator?: string
};

const Specification = ({ className, children, label, ...rest }: SpecificationProps) => {
    const nonEmptyChildren = Children
        .toArray(children)
        .filter(Boolean);

    console.log(nonEmptyChildren);

    if (nonEmptyChildren.length) {
        return (
            <div
                className={ className }
                { ...rest }
            >
                <dt>
                    { label }
                </dt>
                <dd>
                    { nonEmptyChildren }
                </dd>
            </div>
        );
    }

    return null;
};

export default styled(Specification)`
    dt {
        font-size: .875rem;
        letter-spacing: .05em;
        font-weight: 400;


        text-transform: uppercase;
        color:          ${ props => props.theme.subtleTextColor };
    }

    dd {
        margin: .5rem 0;

        ${ props => props.separator && `
            > *:not(:last-child):after {
                content: '${ props.separator }';
            }
        ` }
    }
`;
