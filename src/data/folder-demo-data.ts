import { FileFolderItem } from '../types/file-folder-item-prop'

export const folderDemoData: FileFolderItem[] = [
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
            kind: 'PDF Document',
            createdOn: '2024-01-10',
            createdBy: 'John Doe',
            lastModifiedOn: '2024-02-05',
            lastModifiedBy: 'Jane Smith',
          },
          {
            id: '1-1-2',
            name: 'Lesson 1 Notes.docx',
            type: 'file',
            size: '1.5 MB',
            kind: 'Word Document',
            createdOn: '2024-01-15',
            createdBy: 'Alice Johnson',
            lastModifiedOn: '2024-02-07',
            lastModifiedBy: 'Bob Williams',
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
            kind: 'PDF Document',
            createdOn: '2024-02-01',
            createdBy: 'Eve Carter',
            lastModifiedOn: '2024-02-10',
            lastModifiedBy: 'Charlie Brown',
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
        kind: 'PDF Document',
        createdOn: '2024-03-12',
        createdBy: 'David Green',
        lastModifiedOn: '2024-03-20',
        lastModifiedBy: 'Emma White',
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
            kind: 'PDF Document',
            createdOn: '2024-01-05',
            createdBy: 'Sophia Black',
            lastModifiedOn: '2024-02-14',
            lastModifiedBy: 'Liam Wilson',
          },
          {
            id: '3-1-2',
            name: 'Cheat Sheet.xlsx',
            type: 'file',
            size: '3 MB',
            kind: 'Excel Spreadsheet',
            createdOn: '2024-02-20',
            createdBy: 'Olivia Davis',
            lastModifiedOn: '2024-03-01',
            lastModifiedBy: 'Noah Brown',
          },
        ],
      },
    ],
  },
]
