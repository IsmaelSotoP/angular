import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Alumnos} from '../models/Alumnos';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {
 //array alumnos
 //https://stackoverflow.com/questions/40589730/local-storage-in-angular-2/40590101
 AlumnosArray: Alumnos[] = [
   {id:1 , nombre: "uno",estado:1,promedio:0},
   {id:2 , nombre: "dos",estado:2,promedio:4.6},
   {id:3 , nombre:"Sdsd",estado:1,promedio:0}
 ]
 //estados
 public estados:any = [
   {id:1,nombre: "aprobado"},
   {id:2,nombre: "reprobado"}]

//
public estadoSelect:any = {id:null,nombre:null};

  //array de uno para editar o agregar alumno
 AlumnosSelect: Alumnos = new Alumnos();

 //arreglo para calificar
 Promediar  = {alumno:new Alumnos(), nota1 : 0,nota2 : 0}
 
 //boolean para mostrar /ocultar formulario Agrega/edita
 public MostrarFormularioEdit: boolean = false;

  constructor() { }

  ngOnInit() {
  }
  /// Editar([id:1,nombre:"sd"])
  public Editar(alumno: Alumnos) {
    console.log( Object.assign({}, alumno));
    this.MostrarFormularioEdit=true;
    this.AlumnosSelect = alumno;
  }
  
  public GuardarAgregarEdit(){
    console.log(this.AlumnosSelect);
    //editando
    if (this.AlumnosSelect.id >0){
      this.AlumnosSelect = new Alumnos();
    }
    //agregando
    else{
      this.AlumnosSelect.id = this.AlumnosArray.length+1
      this.AlumnosSelect.estado = 1;
      this.AlumnosSelect.promedio = 0;
      this.AlumnosArray.push(this.AlumnosSelect);
      this.AlumnosSelect = new Alumnos();
    }
    this.MostrarFormularioEdit=false;
  }


  onDelete (a: Alumnos) {
    console.log(a);
    if(confirm('Estas Seguro?')) {
      this.AlumnosArray = this.AlumnosArray.filter(x=>x != a);//filtra al recorrer  el array, el alumno que es igual al seleccionado
      console.log(this.AlumnosArray);
    }
  }

  public calificar(){
      
      //calcular promedio de dos notas
      let promedio:number = (Number(this.Promediar.nota1)+Number(this.Promediar.nota2))/2;
        console.log(promedio);
        console.log(promedio/2);
        //calular estado segun promedio (actualiza directamente en array general)
        if (promedio>=4.0){
          this.Promediar.alumno.estado = 1;
        }
        //if rojo
        else{
          this.Promediar.alumno.estado = 2;
        }
        
        this.Promediar.alumno.promedio = promedio;

       // for (let index = 0; index < this.AlumnosArray.length; index++) {
           /* console.log(this.Promediar.alumno.id +"-"+this.AlumnosArray[index].id);
            if (this.AlumnosArray[this.Promediar.alumno.id].id == this.Promediar.alumno.id){
              console.log("llegue");
              if (promedio>=4.0){
                this.AlumnosArray[index].estado = 1;
                this.AlumnosArray[index].promedio = promedio;
              }
              //if rojo
              else{
                this.AlumnosArray[index].estado = 2;
                this.AlumnosArray[index].promedio = promedio;
              }
            //}
          }*/
        
        //resetear ArraySelect
        this.Promediar.alumno = new Alumnos();
        this.Promediar.nota1 = null;
        this.Promediar.nota2 = null;
      

  }
  //iguala variable promediar a alumno seleccionado
  public FormCalificar(alumno: Alumnos){
      this.Promediar.alumno = alumno;
      console.log(this.Promediar);
  }

  //guardar estado 
  public AgregaEstado(){
    if (this.estadoSelect.id==null){
      this.estadoSelect.id = this.estados.length+1;
      this.estados.push(this.estadoSelect);
    }
    //al finalizar, resetea estadoselect
    this.estadoSelect = {id:null,nombre:null};
  }

  public EditarEstado(estado:any){
    this.estadoSelect = estado;

  }

  public EliminarEstado(estado:any){
    if(confirm('Estas Seguro?')) {
      this.estados = this.estados.filter(x=>x != estado);//filtra al recorrer  el array, el alumno que es igual al seleccionado
      console.log(this.estados);
    }

  }

}
