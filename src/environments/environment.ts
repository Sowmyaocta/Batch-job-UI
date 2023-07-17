// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseApi: "http://schedule-service-dev.eba-yzpucqzf.us-east-1.elasticbeanstalk.com",
  appointmentMode:3 //1 -> select by Provider Only,2 -> select by Service Only,3 ->Radio buttons for Provider,service selection
  //http://schedule-service-dev.eba-yzpucqzf.us-east-1.elasticbeanstalk.com
  //https://my-json-server.typicode.com/kaduluri/mockData
  //http://schedule-service-dev.eba-yzpucqzf.us-east-1.elasticbeanstalk.com
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
