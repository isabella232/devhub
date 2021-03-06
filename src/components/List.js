import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import ComponentFactory from './ComponentFactory';
import { colorMap, size } from './dev-hub/theme';

const enumtypeMap = {
    arabic: '1',
    loweralpha: 'a',
    upperalpha: 'A',
    lowerroman: 'i',
    upperroman: 'I',
};

const UnorderedList = styled('ul')`
    list-style: none;
    margin-bottom: ${size.articleContent};
    margin-top: -${size.xsmall};
    padding-left: ${size.medium};
    li:before {
        content: '○';
        color: ${colorMap.darkGreen};
        margin-right: ${size.medium};
        font-size: 8px;
        position: relative;
        top: -3px;
    }
    li {
        display: flex;
    }
`;

const List = ({ nodeData: { children, enumtype, startat }, ...rest }) => {
    const ListTag = enumtype === 'unordered' ? UnorderedList : 'ol';
    const attributes = {};
    if (enumtype in enumtypeMap) {
        attributes.type = enumtypeMap[enumtype];
    }
    if (startat) {
        attributes.start = startat;
    }
    return (
        <ListTag {...attributes}>
            {children.map((listChild, index) => (
                <ComponentFactory {...rest} nodeData={listChild} key={index} />
            ))}
        </ListTag>
    );
};

List.propTypes = {
    nodeData: PropTypes.shape({
        children: PropTypes.array.isRequired,
        enumtype: PropTypes.string.isRequired,
        startat: PropTypes.number,
    }).isRequired,
};

export default List;
