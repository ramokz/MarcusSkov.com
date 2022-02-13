import {defineStore} from "pinia";

// Defines the object type that should be returned in the getters
interface Project {
    slug: string,
    full_slug: string
}

export const useStories = defineStore('storyblok', {
    state: () => {
        return {
            index: 0,
            storiesData: []
        }
    },
    getters: {
        getAllProjects: (state) => {
            return state.storiesData.filter((project: Project) => project.full_slug.includes('project'))
        },
        getProject: () => {
            let allProjects = useStories().getAllProjects
            
            // TODO - Find a cleaner approach to grab the array item
            // return (slug: string) => allProjects.filter((project: Project) => project.slug === slug)[0]
        }
    }
})