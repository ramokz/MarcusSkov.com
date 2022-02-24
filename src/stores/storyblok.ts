import { defineStore } from 'pinia'

// Defines the object type that should be returned in the getters
interface Project {
    slug: string,
    full_slug: string
}

export const useStories = defineStore('storyblok', {
	state: () => {
		return {
			index: 0,
			projectData: []
		}
	},
	getters: {
		getProject(): object {
			const allProjects = this.projectData

			return (slug: string) => allProjects.find((project: Project) => project.slug === slug)
		}
	}
})