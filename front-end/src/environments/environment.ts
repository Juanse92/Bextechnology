// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
let protocol ='https'
let host = 'localhost'
let port = '7291'
let path = protocol + "://" + host + ":" + port

export const environment = {
  production: false
};

export const endPoints: string | any ={
  PaisesService: path + "/pais",
  DepartamentoService: path + "/departamento",
  CiudadService: path + "/ciudad"
}
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
