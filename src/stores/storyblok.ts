import {defineStore} from 'pinia'

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
		getAllProjects(state): Array<Project>  {
			return state.storiesData.filter((project: Project) => project.full_slug.includes('project'))
		},
		getProject(): object {
			const allProjects = this.getAllProjects
			
			return (slug: string) => allProjects.find((project: Project) => project.slug === slug)
		}
	}
})