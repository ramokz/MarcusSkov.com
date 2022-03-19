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
    getAllProjects(): Array {
      if (localStorage.getItem('illusionaryWall') === import.meta.env.VITE_ILLUSION) {
        return this.projectData
      }
      else {
        return this.projectData.filter(data => !data.content.illusionaryWall )
      }
    },
    getProject(): object {
      // const allProjects = this.projectData

      return (slug: string) => this.getAllProjects.find((project: Project) => project.slug === slug)
    },
    getProjectIndex() {
      return (slug: any) => this.getAllProjects.findIndex((project: Project) => project.slug === slug)
    }
  }
})