export type ClientResponse = {
  results: {
    name: {
      first: string;
      last: string;
    };
  }[];
};

export type TodoListItem = {
  id: string;
  label: string;
  isChecked: boolean;
};
