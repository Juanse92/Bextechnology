import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { PaisesService } from '../service/paises.service';
import Swal from 'sweetalert2';
import { Paises } from '../entities/pais';
import { Departamento } from '../entities/departamento';
import { DepartamentoService } from '../service/departamento.service';
import { CiudadService } from '../service/ciudad.service';
import { Ciudad } from '../entities/ciudad';


interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-tablero-crud',
  templateUrl: './tablero-crud.component.html',
  styleUrl: './tablero-crud.component.css'
})
export class TableroCRUDComponent implements OnInit {

  registros?: SelectItem[] | any=[];
  filterMode = 'lenient';

  constructor(
    private paisesService: PaisesService,
    private departamentoService: DepartamentoService,
    private ciudadService: CiudadService
  ){}
  ngOnInit(): void {
    this.cargarDatos()
  }
  async cargarDatos(){
    let paises: Paises[]
    let departamentos: Departamento[]
    let ciudades: Ciudad[]
    this.paisesService.getPaises().subscribe(
      p => {
        paises = [...p];
        if(paises && paises.length>0)
        this.departamentoService.getDepartamentos().subscribe(
          d =>{
            departamentos=[...d]
            this.ciudadService.getCiudades().subscribe(
              c =>{
                ciudades=[...c]
                for(const pa of paises){
                  let dep=departamentos.filter(dp=>dp.fkPaisId==pa.id)
                  let departamentoItemList=[]
                  if(dep && dep.length>0)
                  for(const de of dep){
                    let ciu=ciudades.filter(ci=>ci.fkDepartamentoId==de.id)
                    let ciudadItemList=[]
                    if(ciu && ciu.length>0)
                    for(const ci of ciu){
                      ciudadItemList.push({data:{id:ci.id, nombre:ci.ciudad1}})
                    }
                    departamentoItemList.push({data:{id:de.id, nombre:de.departamento1},children:ciudadItemList})
                  }
                  this.registros!.push({data:{id:pa.id, nombre:pa.pais},children:departamentoItemList})
                }
                this.reinicioTabla()
              }
            )
          }
        )
      }
    )
  }

  flagDiag:boolean=false
  flag:boolean=true
  pais:string=''
  departamento:string=''
  ciudad:string=''
  titleDiag:string=''
  idPais:number=0;
  idDepartamento:number=0;
  idCiudad:number=0;
  crud:string=''
  eliminadoName:string=''
  CRUD(){
    switch (this.titleDiag) {
      case 'pais':
        this.CRUDPais()
        break;
        case 'departamento':
          this.CRUDDepartamento()
          break;
        case 'ciudad':
          this.CRUDCiudad()
        break;
      default:
        break;
    }
  }
  CRUDPais(){
    let pai=new Paises()
    pai.pais=this.pais
    switch (this.crud) {
      case 'POST':
        this.paisesService.create(pai).subscribe(
          pais =>{
            if(pais){
              this.flagDiag=false
              this.registros.push({children:[],data:{id:pais.id,nombre:pais.pais},parent:null})
              Swal.fire('Resgristro', `Pais ${pais.pais} registrado`,'success')
              this.reinicioTabla()
            }else{
              this.flagDiag=false
              Swal.fire('Advertencia', `Pais ${this.pais} ya se encontraba registrado`,'warning')
            }
          }
        )
        break;
      case 'PUT':
        pai.id=this.idPais
        this.paisesService.update(pai).subscribe(
          pais =>{
            this.flagDiag=false
            const indexPais = this.registros.findIndex((el:any) => el.data.id == pais.id )
            let children = this.registros[indexPais].children
            this.registros[indexPais]={children:children,data:{id:pais.id,nombre:pais.pais},parent:null}
            Swal.fire('Atualización', `Pais ${pais.pais} actualizado`,'success')
            this.reinicioTabla()
          }
        )
        break;
      case 'DELETE':
        Swal.fire({
          title: 'Seguro?',
          text: `Estas seguro en eliminar el pais ${this.eliminadoName}`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí',
          cancelButtonText: 'No'
        }).then((result) => {
          if (result.isConfirmed) {
            this.paisesService.delete(this.idPais).subscribe(
              pai =>{
                this.flagDiag=false
                this.registros=this.registros.filter((fil:any) => fil.data.id !== this.idPais)
                Swal.fire('Eliminado', `Pais ${this.eliminadoName} eliminado`,'success')
                this.reinicioTabla()
              }
            )
          }
        })
        break;
      default:
        break;
    }
  }
  CRUDDepartamento(){
    let dep=new Departamento()
    dep.departamento1=this.departamento
    dep.fkPaisId=this.idPais
    switch (this.crud) {
      case 'POST':
        this.departamentoService.create(dep).subscribe(
          depar =>{
            if(depar){
              this.flagDiag=false
              let departamento:any={children:[],data:{id:depar.id,nombre:depar.departamento1}}
              const indexPais = this.registros.findIndex((el:any) => el.data.id == this.idPais );
              this.registros[indexPais].children.push(departamento);
              Swal.fire('Resgristro', `Departamento ${depar.departamento1} registrado`,'success')
              this.reinicioTabla()}
            else{
              this.flagDiag=false
              Swal.fire('Advertencia', `Departamento ${this.departamento} ya se encontraba registrado`,'warning')
            }
          }
        )
        break;
      case 'PUT':
        dep.id=this.idDepartamento
        this.departamentoService.update(dep).subscribe(
          depar =>{
            this.flagDiag=false
            const indexPais = this.registros.findIndex((el:any) => el.data.id == this.idPais )
            const indexDepartamento = this.registros[indexPais].children.findIndex((el:any) => el.data.id == this.idDepartamento )
            let children = this.registros[indexPais].children[indexDepartamento].children
            this.registros[indexPais].children[indexDepartamento]={children:children,data:{id:depar.id,nombre:depar.departamento1}}
            Swal.fire('Atualización', `Departamento ${depar.departamento1} actualizado`,'success')
            this.reinicioTabla()
          }
        )
        break;
      case 'DELETE':
        Swal.fire({
          title: 'Seguro?',
          text: `Estas seguro en eliminar el departamento ${this.eliminadoName}`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí',
          cancelButtonText: 'No'
        }).then((result) => {
          if (result.isConfirmed) {
            this.departamentoService.delete(this.idDepartamento).subscribe(
              dep =>{
                const indexPais = this.registros.findIndex((el:any) => el.data.id == this.idPais )
                this.registros[indexPais].children=this.registros[indexPais].children.filter((fil:any) => fil.data.id !== this.idDepartamento)
                Swal.fire('Eliminado', `Departamento ${this.eliminadoName} eliminado`,'success')
                this.reinicioTabla()
              }
            )
          }
        })
        break;
      default:
        break;
    }
  }
  CRUDCiudad(){
    console.log(this.idPais)
    console.log(this.idDepartamento)
    let ciud=new Ciudad()
    ciud.ciudad1=this.ciudad
    ciud.fkDepartamentoId=this.idDepartamento
    switch (this.crud) {
      case 'POST':
        this.ciudadService.create(ciud).subscribe(
          ciuda =>{
            if(ciuda){
              this.flagDiag=false
              let ciudad:any={children:[],data:{id:ciuda.id,nombre:ciuda.ciudad1}}
              const indexPais = this.registros.findIndex((el:any) => el.data.id == this.idPais )
              console.log(indexPais)

              const indexDepartamento = this.registros[indexPais].children.findIndex((el:any) => el.data.id == this.idDepartamento )
              this.registros[indexPais].children[indexDepartamento].children.push(ciudad)
              Swal.fire('Resgristro', `Ciudad ${ciuda.ciudad1} registrada`,'success')
              this.reinicioTabla()
            }else{
              this.flagDiag=false
              Swal.fire('Advertencia', `Ciudad ${this.ciudad} ya se encontraba registrado`,'warning')
            }
          }
        )
        break;
      case 'PUT':
        ciud.id=this.idCiudad
        this.ciudadService.update(ciud).subscribe(
          ciuda =>{
            this.flagDiag=false
            const indexPais = this.registros.findIndex((el:any) => el.data.id == this.idPais )
            const indexDepartamento = this.registros[indexPais].children.findIndex((el:any) => el.data.id == this.idDepartamento )
            const indexCiudad = this.registros[indexPais].children[indexDepartamento].children.findIndex((el:any) => el.data.id == this.idCiudad )
            let children = this.registros[indexPais].children[indexDepartamento].children[indexCiudad].children
            this.registros[indexPais].children[indexDepartamento].children[indexCiudad]={children:children,data:{id:ciuda.id,nombre:ciuda.ciudad1}}

            Swal.fire('Atualización', `Ciudad ${ciuda.ciudad1} actualizada`,'success')
            this.reinicioTabla()
          }
        )
        break;
      case 'DELETE':
        Swal.fire({
          title: 'Seguro?',
          text: `Estas seguro en eliminar la ciudad ${this.eliminadoName}`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí',
          cancelButtonText: 'No'
        }).then((result) => {
          if (result.isConfirmed) {
            this.ciudadService.delete(this.idCiudad).subscribe(
              ciuda =>{
                this.flagDiag=false
                const indexPais = this.registros.findIndex((el:any) => el.data.id == this.idPais )
                const indexDepartamento = this.registros[indexPais].children.findIndex((el:any) => el.data.id == this.idDepartamento )
                this.registros[indexPais].children[indexDepartamento].children=this.registros[indexPais].children[indexDepartamento].children.filter((fil:any) => fil.data.id !== this.idCiudad)
                Swal.fire('Eliminado', `Ciudad ${this.eliminadoName} eliminada`,'success')
                this.reinicioTabla()
              }
            )
          }
        })
        break;
      default:
        break;
    }

  }
  delete(tipo:string, eve:any){
    this.crud='DELETE'
    switch (tipo) {
      case 'pais':
        this.eliminadoName=eve.node.data.nombre
        this.idPais=eve.node.data.id
        this.CRUDPais()
        break;
      case 'departamento':
        this.eliminadoName=eve.node.data.nombre
        this.idPais=eve.parent.data.id
        this.idDepartamento=eve.node.data.id
        this.CRUDDepartamento()
        break;
      case 'ciudad':
        this.eliminadoName=eve.node.data.nombre
        this.idPais=eve.parent.parent.data.id
        this.idDepartamento=eve.parent.data.id
        this.idCiudad=eve.node.data.id
        this.CRUDCiudad()
        break;
      default:
        break;
    }
  }
  reinicioTabla(){
    this.flag=false
    setTimeout(() => {
      this.flag=true
    }, 1000);
  }
}
