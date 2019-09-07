export const DATA = [
  {
    id: 1,
    text: 'Frontend',
    children: [
      {
        id: 1,
        text: 'Angular',
        isLeaf: true
      },
      {
        id: 2,
        text: 'React',
        isLeaf: false,
        children: [
          {
            id: 1,
            text: 'Redux',
            isLeaf: true
          }
        ]
      }
    ]
  },
  {
    id: 2,
    text: 'Backend',
    children: [
      {
        id: 3,
        text: 'Java',
        isLeaf: true
      },
      {
        id: 4,
        text: '.NET',
        isLeaf: true
      }
    ]
  }
];