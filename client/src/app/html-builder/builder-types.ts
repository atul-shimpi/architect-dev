import {Project} from "../../types/models/Project";
import {Template} from "../../types/models/Template";

export type BuilderPage = {name: string, html: string};

export type BuilderProject = {
    model: Project,
    pages: BuilderPage[],
    css: string,
    js: string,
    template: BuilderTemplate,
};

export type BuilderTemplate = {
    name: string,
    js: string,
    css: string,
    thumbnail: string,
    pages: BuilderPage[],
    config: {
        libraries: string[],
        name: string,
        color: string,
        category: string,
        theme: string,
    }
}