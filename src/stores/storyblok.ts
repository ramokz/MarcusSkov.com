import { defineStore } from 'pinia'

// Defines the object type that should be returned in the getters
interface Project {
    slug: string
    full_slug: string
}

export const useStories = defineStore('storyblok', {
  state: () => {
    return {
      projectIndex: -1,
      projectSlug: '',
      projectData: []
    }
  },
  getters: {
    getProject(): object {
      // const allProjects = this.projectData

      return (slug: string) => this.projectData.find((project: Project) => project.slug === slug)
    },
    getProjectIndex() {
      return (slug: any) => this.projectData.findIndex((project: Project) => project.slug === slug)
    }
  }
})