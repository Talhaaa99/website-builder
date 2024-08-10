import { EditorElement, Templates } from '@/zustand/editorStore';

export type EditorBtns =
  | 'text'
  | 'container'
  | 'section'
  | 'contactForm'
  | 'paymentForm'
  | 'link'
  | '2Col'
  | 'video'
  | '__body'
  | 'image'
  | null
  | '3Col';

export const defaultStyles: React.CSSProperties = {
  backgroundPosition: 'center',
  objectFit: 'cover',
  backgroundRepeat: 'no-repeat',
  textAlign: 'left',
  opacity: '100%',
  height: 'auto',
};

export const initialTemplates: Templates[] = [
  {
    id: 'portfolio-template',
    name: 'Portfolio',
    pages: [
      {
        id: 'page-portfolio-home',
        name: 'Home',
        elements: [
          {
            id: 'editor-1',
            liveMode: false,
            elements: [
              {
                id: '__body',
                name: 'Body',
                type: '__body',
                styles: {
                  padding: '2rem',
                  backgroundColor: '#f7fafc',
                },
                content: [
                  {
                    id: 'header',
                    name: 'Header',
                    type: 'container',
                    styles: {
                      textAlign: 'center',
                      paddingBottom: '1rem',
                    },
                    content: [
                      {
                        id: 'header-title',
                        name: 'Title',
                        type: 'text',
                        styles: {
                          fontSize: '2.25rem',
                          fontWeight: 'bold',
                          color: '#2d3748',
                        },
                        content: {
                          innerText: 'Welcome to My Portfolio',
                        },
                      },
                      {
                        id: 'header-subtitle',
                        name: 'Subtitle',
                        type: 'text',
                        styles: {
                          fontSize: '1.25rem',
                          color: '#4a5568',
                          marginTop: '0.5rem',
                        },
                        content: {
                          innerText: 'Showcasing my projects and experiences',
                        },
                      },
                    ],
                  },
                  {
                    id: 'intro',
                    name: 'Introduction',
                    type: 'container',
                    styles: {
                      padding: '2rem 0',
                      textAlign: 'center',
                    },
                    content: [
                      {
                        id: 'intro-text',
                        name: 'Text',
                        type: 'text',
                        styles: {
                          fontSize: '1.125rem',
                          color: '#2d3748',
                        },
                        content: {
                          innerText:
                            "Hello! I'm a passionate developer with experience in creating dynamic and user-friendly websites. Below are some of my projects.",
                        },
                      },
                    ],
                  },
                  {
                    id: 'portfolio-gallery',
                    name: 'Portfolio Gallery',
                    type: 'container',
                    styles: {
                      display: 'grid',
                      gridTemplateColumns:
                        'repeat(auto-fit, minmax(240px, 1fr))',
                      gap: '1rem',
                    },
                    content: [
                      {
                        id: 'project-1',
                        name: 'Project 1',
                        type: 'container',
                        styles: {
                          textAlign: 'center',
                          padding: '1rem',
                          backgroundColor: '#edf2f7',
                          borderRadius: '0.5rem',
                        },
                        content: [
                          {
                            id: 'project-1-image',
                            name: 'Project Image',
                            type: 'container',
                            styles: {
                              backgroundImage: "url('/images/project1.jpg')",
                              height: '180px',
                              backgroundSize: 'cover',
                              borderRadius: '0.5rem',
                            },
                            content: [],
                          },
                          {
                            id: 'project-1-title',
                            name: 'Project Title',
                            type: 'text',
                            styles: {
                              fontSize: '1.125rem',
                              fontWeight: 'bold',
                              marginTop: '1rem',
                              color: '#2d3748',
                            },
                            content: {
                              innerText: 'Project One',
                            },
                          },
                        ],
                      },
                      {
                        id: 'project-2',
                        name: 'Project 2',
                        type: 'container',
                        styles: {
                          textAlign: 'center',
                          padding: '1rem',
                          backgroundColor: '#edf2f7',
                          borderRadius: '0.5rem',
                        },
                        content: [
                          {
                            id: 'project-2-image',
                            name: 'Project Image',
                            type: 'container',
                            styles: {
                              backgroundImage: "url('/images/project2.jpg')",
                              height: '180px',
                              backgroundSize: 'cover',
                              borderRadius: '0.5rem',
                            },
                            content: [],
                          },
                          {
                            id: 'project-2-title',
                            name: 'Project Title',
                            type: 'text',
                            styles: {
                              fontSize: '1.125rem',
                              fontWeight: 'bold',
                              marginTop: '1rem',
                              color: '#2d3748',
                            },
                            content: {
                              innerText: 'Project Two',
                            },
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: 'contact',
                    name: 'Contact',
                    type: 'container',
                    styles: {
                      padding: '2rem 0',
                      textAlign: 'center',
                    },
                    content: [
                      {
                        id: 'contact-title',
                        name: 'Contact Title',
                        type: 'text',
                        styles: {
                          fontSize: '1.875rem',
                          fontWeight: 'bold',
                          color: '#2d3748',
                          marginBottom: '1rem',
                        },
                        content: {
                          innerText: 'Get in Touch',
                        },
                      },
                      {
                        id: 'contact-form',
                        name: 'Contact Form',
                        type: 'container',
                        styles: {
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '1rem',
                        },
                        content: [
                          {
                            id: 'contact-name',
                            name: 'Name',
                            type: 'text',
                            styles: {
                              fontSize: '1rem',
                              padding: '0.5rem',
                              width: '100%',
                              maxWidth: '400px',
                              border: '1px solid #cbd5e0',
                              borderRadius: '0.375rem',
                            },
                            content: {
                              innerText: 'Name',
                            },
                          },
                          {
                            id: 'contact-email',
                            name: 'Email',
                            type: 'text',
                            styles: {
                              fontSize: '1rem',
                              padding: '0.5rem',
                              width: '100%',
                              maxWidth: '400px',
                              border: '1px solid #cbd5e0',
                              borderRadius: '0.375rem',
                            },
                            content: {
                              innerText: 'Email',
                            },
                          },
                          {
                            id: 'contact-message',
                            name: 'Message',
                            type: 'text',
                            styles: {
                              fontSize: '1rem',
                              padding: '0.5rem',
                              width: '100%',
                              maxWidth: '400px',
                              height: '150px',
                              border: '1px solid #cbd5e0',
                              borderRadius: '0.375rem',
                            },
                            content: {
                              innerText: 'Message',
                            },
                          },
                          {
                            id: 'contact-submit',
                            name: 'Submit Button',
                            type: 'text',
                            styles: {
                              fontSize: '1rem',
                              padding: '0.75rem 1.5rem',
                              backgroundColor: '#2b6cb0',
                              color: '#ffffff',
                              borderRadius: '0.375rem',
                              cursor: 'pointer',
                              textAlign: 'center',
                              marginTop: '1rem',
                            },
                            content: {
                              innerText: 'Send Message',
                            },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
            selectedElement: null,
            device: 'Desktop',
            previewMode: false,
            html: '',
            css: '',
            js: '',
          },
        ],
      },
    ],
  },
  {
    id: 'blog-template',
    name: 'Blog',
    pages: [
      {
        id: 'page-blog-home',
        name: 'Home',
        elements: [
          {
            id: 'editor-2',
            liveMode: false,
            elements: [
              {
                id: '__body',
                name: 'Body',
                type: '__body',
                styles: {
                  padding: '2rem',
                  backgroundColor: '#f7fafc',
                },
                content: [
                  {
                    id: 'header',
                    name: 'Header',
                    type: 'container',
                    styles: {
                      textAlign: 'center',
                      paddingBottom: '2rem',
                    },
                    content: [
                      {
                        id: 'header-title',
                        name: 'Title',
                        type: 'text',
                        styles: {
                          fontSize: '3rem',
                          fontWeight: 'bold',
                          color: '#2d3748',
                        },
                        content: {
                          innerText: 'My Awesome Blog',
                        },
                      },
                      {
                        id: 'header-subtitle',
                        name: 'Subtitle',
                        type: 'text',
                        styles: {
                          fontSize: '1.25rem',
                          color: '#4a5568',
                          marginTop: '0.5rem',
                        },
                        content: {
                          innerText: 'Thoughts, stories, and ideas',
                        },
                      },
                    ],
                  },
                  {
                    id: 'blog-posts',
                    name: 'Blog Posts',
                    type: 'container',
                    styles: {
                      display: 'grid',
                      gridTemplateColumns: '1fr',
                      gap: '2rem',
                    },
                    content: [
                      {
                        id: 'post-1',
                        name: 'Post 1',
                        type: 'container',
                        styles: {
                          padding: '1rem',
                          backgroundColor: '#ffffff',
                          borderRadius: '0.5rem',
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        },
                        content: [
                          {
                            id: 'post-1-title',
                            name: 'Post Title',
                            type: 'text',
                            styles: {
                              fontSize: '1.5rem',
                              fontWeight: 'bold',
                              color: '#2d3748',
                            },
                            content: {
                              innerText: 'Blog Post Title One',
                            },
                          },
                          {
                            id: 'post-1-excerpt',
                            name: 'Post Excerpt',
                            type: 'text',
                            styles: {
                              fontSize: '1rem',
                              color: '#4a5568',
                              marginTop: '0.5rem',
                            },
                            content: {
                              innerText:
                                "This is a brief excerpt of the blog post to give readers an idea of what it's about.",
                            },
                          },
                          {
                            id: 'post-1-readmore',
                            name: 'Read More',
                            type: 'text',
                            styles: {
                              fontSize: '1rem',
                              color: '#2b6cb0',
                              marginTop: '0.75rem',
                              cursor: 'pointer',
                              textDecoration: 'underline',
                            },
                            content: {
                              innerText: 'Read More',
                            },
                          },
                        ],
                      },
                      {
                        id: 'post-2',
                        name: 'Post 2',
                        type: 'container',
                        styles: {
                          padding: '1rem',
                          backgroundColor: '#ffffff',
                          borderRadius: '0.5rem',
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        },
                        content: [
                          {
                            id: 'post-2-title',
                            name: 'Post Title',
                            type: 'text',
                            styles: {
                              fontSize: '1.5rem',
                              fontWeight: 'bold',
                              color: '#2d3748',
                            },
                            content: {
                              innerText: 'Blog Post Title Two',
                            },
                          },
                          {
                            id: 'post-2-excerpt',
                            name: 'Post Excerpt',
                            type: 'text',
                            styles: {
                              fontSize: '1rem',
                              color: '#4a5568',
                              marginTop: '0.5rem',
                            },
                            content: {
                              innerText:
                                "This is a brief excerpt of the blog post to give readers an idea of what it's about.",
                            },
                          },
                          {
                            id: 'post-2-readmore',
                            name: 'Read More',
                            type: 'text',
                            styles: {
                              fontSize: '1rem',
                              color: '#2b6cb0',
                              marginTop: '0.75rem',
                              cursor: 'pointer',
                              textDecoration: 'underline',
                            },
                            content: {
                              innerText: 'Read More',
                            },
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: 'footer',
                    name: 'Footer',
                    type: 'container',
                    styles: {
                      paddingTop: '2rem',
                      borderTop: '1px solid #e2e8f0',
                      textAlign: 'center',
                      marginTop: '2rem',
                    },
                    content: [
                      {
                        id: 'footer-text',
                        name: 'Footer Text',
                        type: 'text',
                        styles: {
                          fontSize: '0.875rem',
                          color: '#718096',
                        },
                        content: {
                          innerText:
                            '© 2024 My Awesome Blog. All Rights Reserved.',
                        },
                      },
                    ],
                  },
                ],
              },
            ],
            selectedElement: null,
            device: 'Desktop',
            previewMode: false,
            html: '',
            css: '',
            js: '',
          },
        ],
      },
    ],
  },
];

export function updateElementsRecursive(
  elements: EditorElement[],
  updatedElement: EditorElement,
): EditorElement[] {
  return elements.map((element) => {
    if (element.id === updatedElement.id) {
      return updatedElement;
    }

    if (Array.isArray(element.content)) {
      return {
        ...element,
        content: updateElementsRecursive(
          element.content as EditorElement[],
          updatedElement,
        ),
      };
    }

    return element;
  });
}
