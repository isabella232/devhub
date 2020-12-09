import path from 'path';
import { projects } from '../../queries/projects';
import { parseMarkdownToAST } from './parse-markdown-to-ast';

const createPageForProject = (project, createPage) => {
    const {
        info: { contents, name, slug, ...otherInfo },
        updatedAt: updated_at,
        ...rest
    } = project;
    const parsedContent = parseMarkdownToAST(contents);
    createPage({
        path: slug,
        component: path.resolve(`./src/templates/project.js`),
        context: {
            slug: slug,
            content: parsedContent,
            name,
            updated_at,
            ...otherInfo,
            ...rest,
        },
    });
};

const getProjectListFromGraphql = async graphql => {
    const projectResp = await graphql(projects);
    const result = projectResp.data.allStrapiProjects.nodes;
    return result;
};

export const createProjectPages = async (createPage, graphql) => {
    const projectList = await getProjectListFromGraphql(graphql);
    projectList.forEach(project => createPageForProject(project, createPage));
};