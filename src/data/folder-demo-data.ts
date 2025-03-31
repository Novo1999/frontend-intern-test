export const folderDemoData = [
  {
    id: '1',
    name: 'Chapter 1',
    type: 'folder',
    children: [
      {
        id: '1-1',
        name: 'Chapter 1.1',
        type: 'folder',
        children: [
          {
            id: '1-1-1',
            name: 'Introduction.pdf',
            type: 'file',
            size: '2 MB',
          },
          {
            id: '1-1-2',
            name: 'Lesson 1 Notes.docx',
            type: 'file',
            size: '1.5 MB',
          },
        ],
      },
      {
        id: '1-2',
        name: 'Chapter 1.2',
        type: 'folder',
        children: [
          {
            id: '1-2-1',
            name: 'Summary.pdf',
            type: 'file',
            size: '500 KB',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'Chapter 2',
    type: 'folder',
    children: [
      {
        id: '2-1',
        name: 'Chapter 2 revision notes.pdf',
        type: 'file',
        size: '23 MB',
      },
    ],
  },
  {
    id: '3',
    name: 'Resources',
    type: 'folder',
    children: [
      {
        id: '3-1',
        name: 'Reference Material',
        type: 'folder',
        children: [
          {
            id: '3-1-1',
            name: 'Guide.pdf',
            type: 'file',
            size: '5 MB',
          },
          {
            id: '3-1-2',
            name: 'Cheat Sheet.xlsx',
            type: 'file',
            size: '3 MB',
          },
        ],
      },
    ],
  },
]
