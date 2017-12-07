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
    model: Template,
    css: string,
    js: string,
}