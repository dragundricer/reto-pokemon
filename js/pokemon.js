class pokemon{
    static contadorPokemon = 0;
    _id;
    _nombre;
    _tipo;

    constructor(nombre, tipo) {
        this._id = ++pokemon.contadorPokemon;
        this._nombre = nombre;
        this._tipo = tipo;
      }
    
      get id() {
        return this._id;
      }
    
      get nombre() {
        return this._nombre;
      }
    
      set nombre(nombre) {
        this._nombre = nombre;
      }
      get tipo() {
        return this._tipo;
      }
    
      set tipo(tipo) {
        this._tipo = tipo;
      }
    
}