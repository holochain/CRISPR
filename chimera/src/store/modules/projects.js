export default {
  namespaced: true,

  state: {
    projects: [
      {
        id: 'QmHashyChimera',
        name: 'Chimera',
        type: 'application',
        folder: '/Users/philipbeadle/holochain/CRISPR/dna',
        contact: 'Philip Beadle',
        mobile: '+61 999 999 999',
        description: 'Agent centric personalised Holochain experience for using & configuring hApps includes perrsonal information management and P2P communication.',
        zomes: []
      },
      {
        id: 'QmHashyCRSIPR',
        name: 'CRISPR',
        type: 'application',
        folder: '/Users/philipbeadle/holochain/CRISPR/dna',
        contact: 'Philip Beadle',
        mobile: '+61 999 999 999',
        description: 'Holochain DNA editing system that enables cloning of DNA patterns to create new DNAs. Agents can configure new DNA to store information and behave the way they want. Uses Holochain as a git like source control with branching, permission control and traceability of changes.',
        zomes: []
      },
      {
        id: 'QmHashyCuratedFields',
        name: 'Curated Fields',
        type: 'application',
        folder: '/Users/philipbeadle/holochain/CRISPR/dna',
        contact: 'Philip Beadle',
        mobile: '+61 999 999 999',
        description: 'A managed list of fields that make it simple to map profile fields to personas.',
        zomes: [
          {
            template: 'Origins',
            templateTypeName: 'origin',
            itemsTemplatesName: 'template1',
            name: 'Fields',
            entryTypes: [
              {
                id: 'QmFieldEntryTypeHash',
                name: 'field',
                template: 'list_anchor_types_1',
                fields: [
                  {
                    id: 'Qm1333',
                    fieldName: 'name',
                    fieldType: 'String',
                    fieldDescription: 'Name of the field',
                    required: true
                  },
                  {
                    id: 'QM2345667778871',
                    fieldName: 'ui',
                    fieldType: 'String',
                    fieldDescription: 'The UI component to edit the value',
                    required: true
                  }
                ]
              }
            ],
            anchorTypes: [
              {
                id: 'Qmlist_fields1',
                type: 'list_fields',
                text: '',
                tag: ' ',
                context: 'permanent',
                links: [
                  {
                    entityId: 'QmFieldEntryTypeHash',
                    type: 'field_link',
                    tag: ' ',
                    context: 'exclusive'
                  }
                ],
                anchors: []
              }
            ]
          }
        ]
      },
      {
        id: 'QmHashyPersonasProfiles',
        name: 'Personal Information',
        type: 'application',
        folder: '/Users/philipbeadle/holochain/CRISPR/dna',
        contact: 'Philip Beadle',
        mobile: '+61 999 999 999',
        description: 'Keep control of your personal information, know which apps are using it and update your info in one location.',
        zomes: [
          {
            template: 'Origins',
            templateTypeName: 'origin',
            itemsTemplatesName: 'template1',
            name: 'PersonalInformation',
            entryTypes: [
              {
                id: 'QmPersonaFieldEntryTypeHash',
                name: 'personafield',
                template: 'list_anchor_types_1',
                fields: [
                  {
                    id: 'Qm1333',
                    fieldName: 'fields_field_id',
                    fieldType: 'String',
                    fieldDescription: 'id of the field from the curated and custom fields list',
                    required: true
                  },
                  {
                    id: 'QM2345667778871',
                    fieldName: 'value',
                    fieldType: 'String',
                    fieldDescription: 'The value of the persona field',
                    required: true
                  }
                ]
              },
              {
                id: 'QmProfileFieldEntryTypeHash',
                name: 'profilefield',
                template: 'list_anchor_types_1',
                fields: [
                  {
                    id: 'Qm1333',
                    fieldName: 'fields_field_id',
                    fieldType: 'String',
                    fieldDescription: 'id of the field from the curated and custom fields list',
                    required: true
                  },
                  {
                    id: 'QM2345667778871',
                    fieldName: 'persona_field_address',
                    fieldType: 'String',
                    fieldDescription: 'The address of the persona field entry for the profile field.',
                    required: true
                  },
                  {
                    id: 'QM2345667778871',
                    fieldName: 'contract',
                    fieldType: 'String',
                    fieldDescription: 'The agreement for how the information is stored.',
                    required: true
                  }
                ]
              }
            ],
            anchorTypes: [
              {
                id: 'Qmlist_personas1',
                type: 'Personas',
                text: '',
                tag: ' ',
                context: 'permanent',
                links: [],
                anchors: [
                  {
                    id: 'Qmlist_Qmhashpersona1',
                    type: 'Personas',
                    text: 'Personal',
                    links: [
                      {
                        entityId: 'QmPersonaFieldEntryTypeHash',
                        type: 'field_link',
                        tag: ' ',
                        context: 'exclusive'
                      }
                    ]
                  },
                  {
                    id: 'Qmlist_Qmhashpersona2',
                    type: 'Personas',
                    text: 'Music',
                    links: [
                      {
                        entityId: 'QmPersonaFieldEntryTypeHash',
                        type: 'field_link',
                        tag: ' ',
                        context: 'exclusive'
                      }
                    ]
                  }
                ]
              },
              {
                id: 'Qmlist_profiles1',
                type: 'Profiles',
                text: '',
                tag: ' ',
                context: 'permanent',
                links: [],
                anchors: [
                  {
                    id: 'Qmlist_Qmhashprofile1',
                    type: 'Profiles',
                    text: 'CRISPR',
                    links: [
                      {
                        entityId: 'QmProfileFieldEntryTypeHash',
                        type: 'field_link',
                        tag: ' ',
                        context: 'exclusive'
                      }
                    ]
                  },
                  {
                    id: 'Qmlist_Qmhashprofile2',
                    type: 'Profiles',
                    text: 'Holo Punk Records',
                    links: [
                      {
                        entityId: 'QmProfileFieldEntryTypeHash',
                        type: 'field_link',
                        tag: ' ',
                        context: 'exclusive'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'Qmmorebighashes333',
        name: 'Freckles',
        type: 'application',
        folder: '/Users/philipbeadle/holochain/CRISPR/dna',
        contact: 'Philip Beadle',
        mobile: '+61 999 999 999',
        description: 'Freckles have a title, content and order. Set the permissions at build time to control who can update and delete freckles.',
        zomes: [
          {
            template: 'Origins',
            templateTypeName: 'origin',
            itemsTemplatesName: 'template1',
            name: 'Freckles',
            entryTypes: [
              {
                id: 'QmFreckleEntryTypeHash',
                name: 'freckle',
                template: 'list_anchor_types_1',
                fields: [
                  {
                    id: 'QM234566777887',
                    fieldName: 'content',
                    fieldType: 'String',
                    fieldDescription: 'Main body of the freckle',
                    required: false
                  }
                ]
              }
            ],
            anchorTypes: [
              {
                id: 'Qmlist_freckles1',
                type: 'list_freckles',
                text: '',
                tag: ' ',
                context: 'permanent',
                links: [
                  {
                    entityId: 'QmFreckleEntryTypeHash',
                    type: 'freckle_link',
                    tag: ' ',
                    context: 'exclusive'
                  }
                ],
                anchors: []
              }
            ]
          }
        ]
      },
      {
        id: 'Qmmorebighashes333',
        name: 'Notes',
        type: 'part',
        folder: '/Users/philipbeadle/holochain/CRISPR/dna',
        contact: 'Philip Beadle',
        mobile: '+61 999 999 999',
        description: 'Notes have a title, content and order. Set the permissions at build time to control who can update and delete notes.',
        zomes: [
          {
            template: 'Origins',
            templateTypeName: 'origin',
            itemsTemplatesName: 'template1',
            name: 'Notes',
            entryTypes: [
              {
                id: 'QmNoteEntryTypeHash',
                name: 'note',
                template: 'list_anchor_types_1',
                fields: [
                  {
                    id: 'Qm1333',
                    fieldName: 'title',
                    fieldType: 'String',
                    fieldDescription: 'Title of the note',
                    required: true
                  },
                  {
                    id: 'QM234566777887',
                    fieldName: 'content',
                    fieldType: 'String',
                    fieldDescription: 'Main body of the note',
                    required: false
                  },
                  {
                    id: 'QM2345667778871',
                    fieldName: 'order',
                    fieldType: 'u32',
                    fieldDescription: '',
                    required: false
                  }
                ]
              }
            ],
            anchorTypes: [
              {
                id: 'Qmlist_notes1',
                type: 'list_notes',
                text: '',
                tag: ' ',
                context: 'permanent',
                links: [
                  {
                    entityId: 'QmNoteEntryTypeHash',
                    type: 'note_link',
                    tag: ' ',
                    context: 'exclusive'
                  }
                ],
                anchors: [
                  {
                    id: 'Qmlist_Qmhashnote1',
                    type: 'list_notes',
                    text: 'Address1NoteLinkedFrom',
                    links: [
                      {
                        entityId: 'QmNoteEntryTypeHash',
                        type: 'note_link',
                        tag: ' ',
                        context: 'exclusive'
                      }
                    ]
                  },
                  {
                    id: 'Qmlist_Qmhashnote2',
                    type: 'list_notes',
                    text: 'Address2NoteLinkedFrom',
                    links: [
                      {
                        entityId: 'QmNoteEntryTypeHash',
                        type: 'note_link',
                        tag: ' ',
                        context: 'exclusive'
                      }
                    ]
                  },
                  {
                    id: 'Qmlist_Qmhashnote3',
                    type: 'list_notes',
                    text: 'Address3NoteLinkedFrom',
                    links: [
                      {
                        entityId: 'QmNoteEntryTypeHash',
                        type: 'note_link',
                        tag: ' ',
                        context: 'exclusive'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'QmmorehashyTasks',
        name: 'Tasks',
        type: 'part',
        folder: '/Users/philipbeadle/holochain/CRISPR/dna',
        contact: 'Philip Beadle',
        mobile: '+61 999 999 999',
        description: 'A clone of Notes DNA. Tasks have title, done and order.',
        zomes: [
          {
            template: 'Origins',
            templateTypeName: 'origin',
            itemsTemplatesName: 'template1',
            name: 'Tasks',
            entryTypes: [
              {
                id: 'QmTaskEntryTypeHash',
                name: 'task',
                template: 'list_anchor_types_1',
                fields: [
                  {
                    id: 'Qm1333',
                    fieldName: 'title',
                    fieldType: 'String',
                    fieldDescription: 'Title of the task',
                    required: true
                  },
                  {
                    id: 'QM234566777887',
                    fieldName: 'done',
                    fieldType: 'bool',
                    fieldDescription: 'Whether its done or not.',
                    required: false
                  }
                ]
              }
            ],
            anchorTypes: [
              {
                id: 'Qmlist_tasks1',
                type: 'list_tasks',
                text: '',
                tag: ' ',
                context: 'permanent',
                links: [
                  {
                    entityId: 'QmTaskEntryTypeHash',
                    type: 'task_link',
                    tag: ' ',
                    context: 'exclusive'
                  }
                ],
                anchors: [
                  {
                    id: 'Qmlist_Qmhashtask1',
                    type: 'list_tasks',
                    text: 'Address1TaskLinkedFrom',
                    links: [
                      {
                        entityId: 'QmTaskEntryTypeHash',
                        type: 'task_link',
                        tag: ' ',
                        context: 'exclusive'
                      }
                    ]
                  },
                  {
                    id: 'Qmlist_Qmhashtask2',
                    type: 'list_tasks',
                    text: 'Address2TaskLinkedFrom',
                    links: [
                      {
                        entityId: 'QmTaskEntryTypeHash',
                        type: 'task_link',
                        tag: ' ',
                        context: 'exclusive'
                      }
                    ]
                  },
                  {
                    id: 'Qmlist_Qmhashtask3',
                    type: 'list_tasks',
                    text: 'Address3TaskLinkedFrom',
                    links: [
                      {
                        entityId: 'QmTaskEntryTypeHash',
                        type: 'task_link',
                        tag: ' ',
                        context: 'exclusive'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'QmHashyKanban',
        name: 'Kanban',
        type: 'application',
        folder: '/Users/philipbeadle/holochain/CRISPR/dna',
        contact: 'Philip Beadle',
        mobile: '+61 999 999 999',
        description: 'A kanban board that you can kanban any type of part using the slot.',
        zomes: [
          {
            template: 'Origins',
            templateTypeName: 'origin',
            itemsTemplatesName: 'template1',
            name: 'Kanban',
            entryTypes: [
              {
                id: 'QmColumnEntryTypeHash',
                name: 'column',
                template: 'list_anchor_types_1',
                fields: [
                  {
                    id: 'Qm1333',
                    fieldName: 'title',
                    fieldType: 'String',
                    fieldDescription: 'Title of the column',
                    required: true
                  },
                  {
                    id: 'QM234566777887',
                    fieldName: 'order',
                    fieldType: 'u32',
                    fieldDescription: '',
                    required: false
                  }
                ]
              }
            ],
            anchorTypes: [
              {
                id: 'Qmlist_columns1',
                type: 'list_columns',
                text: '',
                tag: ' ',
                context: 'permanent',
                links: [
                  {
                    entityId: 'QmColumnEntryTypeHash',
                    type: 'column_link',
                    tag: ' ',
                    context: 'exclusive'
                  }
                ],
                anchors: [
                  {
                    id: 'Qmlist_Qmhashcolumn1',
                    type: 'list_columns',
                    text: 'Address1ColumnLinkedFrom',
                    links: [
                      {
                        entityId: 'QmColumnEntryTypeHash',
                        type: 'column_link',
                        tag: ' ',
                        context: 'exclusive'
                      }
                    ]
                  },
                  {
                    id: 'Qmlist_Qmhashcolumn2',
                    type: 'list_columns',
                    text: 'Address2ColumnLinkedFrom',
                    links: [
                      {
                        entityId: 'QmColumnEntryTypeHash',
                        type: 'column_link',
                        tag: ' ',
                        context: 'exclusive'
                      }
                    ]
                  },
                  {
                    id: 'Qmlist_Qmhashcolumn3',
                    type: 'list_columns',
                    text: 'Address3ColumnLinkedFrom',
                    links: [
                      {
                        entityId: 'QmColumnEntryTypeHash',
                        type: 'column_link',
                        tag: ' ',
                        context: 'exclusive'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'Qmmoreratings',
        name: 'Ratings',
        type: 'part',
        folder: '/Users/philipbeadle/holochain/CRISPR/dna',
        contact: 'Philip Beadle',
        mobile: '+61 999 999 999',
        description: 'Ratings store a number between 0 & x',
        zomes: [
          {
            template: 'Origins',
            templateTypeName: 'origin',
            itemsTemplatesName: 'template1',
            name: 'Ratings',
            entryTypes: [
              {
                id: 'QmRatingEntryTypeHash',
                name: 'rating',
                template: 'list_anchor_types_1',
                fields: [
                  {
                    id: 'QM2345667778871',
                    fieldName: 'rating',
                    fieldType: 'u32',
                    fieldDescription: '',
                    required: false
                  }
                ]
              }
            ],
            anchorTypes: [
              {
                id: 'Qmlist_ratings1',
                type: 'list_ratings',
                text: '',
                tag: ' ',
                context: 'permanent',
                links: [
                  {
                    entityId: 'QmRatingEntryTypeHash',
                    type: 'rating_link',
                    tag: ' ',
                    context: 'exclusive'
                  }
                ],
                anchors: [
                  {
                    id: 'Qmlist_Qmhashrating1',
                    type: 'list_ratings',
                    text: 'Address1RatingLinkedFrom',
                    links: [
                      {
                        entityId: 'QmRatingEntryTypeHash',
                        type: 'rating_link',
                        tag: ' ',
                        context: 'exclusive'
                      }
                    ]
                  },
                  {
                    id: 'Qmlist_Qmhashrating2',
                    type: 'list_ratings',
                    text: 'Address2RatingLinkedFrom',
                    links: [
                      {
                        entityId: 'QmRatingEntryTypeHash',
                        type: 'rating_link',
                        tag: ' ',
                        context: 'exclusive'
                      }
                    ]
                  },
                  {
                    id: 'Qmlist_Qmhashrating3',
                    type: 'list_ratings',
                    text: 'Address3RatingLinkedFrom',
                    links: [
                      {
                        entityId: 'QmRatingEntryTypeHash',
                        type: 'rating_link',
                        tag: ' ',
                        context: 'exclusive'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  getters: {
    applicationProjects: state => {
      return state.projects.filter(p => p.type === 'application')
    },
    partProjects: state => {
      return state.projects.filter(p => p.type === 'part')
    },
    projectById: (state) => (projectId) => {
      return state.projects.find(p => p.id === projectId)
    }
  }
}
