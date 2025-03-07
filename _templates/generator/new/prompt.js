module.exports = [
    {
      type: 'input',
      name: 'name',
      message: 'Ingrese el nombre del nuevo componente:',
      validate: (input) => {
        if (!input || input.trim() === '') {
          return 'El nombre del componente no puede estar vacío';
        }
        return true;
      },
      filter: (input) => input.trim(), // Elimina espacios en blanco innecesarios
    },
  ];
  