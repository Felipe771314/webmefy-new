module.exports = [
  {
    type: 'input',
    name: 'name',
    message: 'Ingrese el nombre del nuevo componente:',
    validate: (input) => (input ? true : 'El nombre del componente no puede estar vacío'),
  },
];
