import React from 'react';
import dlv from 'dlv';
import { withPrefix } from 'gatsby';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import DocumentBody from '../components/DocumentBody';
import ArticleShareFooter from '../components/dev-hub/article-share-footer';
import BlogPostTitleArea from '../components/dev-hub/blog-post-title-area';
import Layout from '../components/dev-hub/layout';
import { screenSize, size } from '../components/dev-hub/theme';
import Link from '../components/dev-hub/link';
import SEO from '../components/dev-hub/SEO';
import { findSectionHeadings } from '../utils/find-section-headings';

import { toDateString } from '../utils/format-dates';
import { useSiteMetadata } from '../hooks/use-site-metadata';
import ShareMenu from '../components/dev-hub/share-menu';
import ContentsMenu from '../components/dev-hub/contents-menu';
import { mapTagTypeToUrl } from '../utils/map-tag-type-to-url';

const ArticleContent = styled('article')`
    max-width: ${size.maxContentWidth};
    padding-left: ${size.small};
    padding-right: ${size.small};
    @media ${screenSize.upToLarge} {
        margin: 0 auto;
    }
`;
const Icons = styled('div')`
    margin: ${size.tiny} ${size.default};
    span {
        padding: 0 ${size.tiny};
    }
    @media ${screenSize.largeAndUp} {
        display: flex;
        flex-direction: column;
        span:not(:first-of-type) {
            margin-top: ${size.small};
        }
    }
    @media ${screenSize.upToLarge} {
        margin: 0 ${size.small};
        span:not(:first-of-type) {
            margin-left: ${size.small};
        }
    }
`;
const Container = styled('div')`
    margin: 0 auto;
    @media ${screenSize.largeAndUp} {
        display: flex;
        justify-content: center;
    }
`;

const dateFormatOptions = {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
};

const Project = props => {
    const {
        content,
        updated_at,
        published_at,
        languages,
        products,
        project_link,
        tags,
        image,
        name,
        slug,
        students,
    } = props.pageContext;
    console.log(props.pageContext);
    const studentMap = students.map(s => ({
        name: s.bio.name,
        image: s.bio.image.url,
    }));
    const childNodes = getContent(dlv(content, 'children', []));
    const articleBreadcrumbs = [
        { label: 'Home', target: '/' },
        { label: 'Academia', target: '/academia' },
    ];
    const { siteUrl } = useSiteMetadata();
    const articleUrl = `${siteUrl}${props.pageContext.slug}`;

    const formattedPublishedDate = toDateString(
        published_at,
        dateFormatOptions
    );
    const formattedUpdatedDate = toDateString(updated_at, dateFormatOptions);

    const mappedLanguages = mapTagTypeToUrl(
        languages.map(l => l.language),
        'language'
    );
    const mappedProducts = mapTagTypeToUrl(
        products.map(l => l.product),
        'product'
    );
    const mappedTags = mapTagTypeToUrl(
        tags.map(l => l.tag),
        'tag'
    );
    const headingNodes = findSectionHeadings(
        childNodes,
        'type',
        'heading',
        1,
        -1
    );
    const tagsList = [...mappedTags, ...mappedLanguages, ...mappedProducts];
    return (
        <Layout>
            <BlogPostTitleArea
                articleImage={image.url}
                authors={studentMap}
                breadcrumb={articleBreadcrumbs}
                originalDate={formattedPublishedDate}
                tags={tagsList}
                title={name}
                updatedDate={formattedUpdatedDate}
            />
            <Container>
                <Icons>
                    <ContentsMenu
                        title="Contents"
                        headingNodes={headingNodes}
                        height={size.default}
                        width={size.default}
                    />
                    <ShareMenu
                        title={name}
                        url={articleUrl}
                        height={size.default}
                        width={size.default}
                    />
                </Icons>
                <ArticleContent>
                    <Link href={project_link}>Project Link</Link>
                    <DocumentBody
                        pageNodes={childNodes}
                        slug={slug}
                        {...props}
                    />
                    <ArticleShareFooter
                        title={name}
                        url={articleUrl}
                        tags={tagsList}
                    />
                </ArticleContent>
            </Container>
        </Layout>
    );
};

export default Project;