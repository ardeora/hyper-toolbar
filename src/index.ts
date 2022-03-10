// @ts-nocheck
import myDecorateHyper from './hyper/decorateHyper'
import reduceUI from './hyper/reduceUI'
import mapHyperState from './hyper/mapHyperState'
import decorateConfig from './hyper/decorateConfig'
// import decorateMenu from './hyper/decorateMenu'
import onWindow from './hyper/onWindow'

exports.reduceUI       = reduceUI;
exports.mapHyperState  = mapHyperState;
exports.decorateConfig = decorateConfig;
exports.decorateHyper  = myDecorateHyper;
exports.onWindow       = onWindow;
// exports.onApp(app => {
//   app.whenReady(() => {
//     app.allowRendererProcessReuse = false
//   })
// })

// exports.onWindow       = (window: Window) => {
  
//   window.rpc.on('abcd', () => {
//     // @ts-expect-error
//       let a  = window.sessions.keys()
//       for (const key of a) {
//         console.dir(window.sessions.get(key))
//         console.dir(window.sessions.get(key).pty)
//         console.dir(window.sessions.get(key).pty.master())
//         console.log(window.sessions.get(key).constructor.name)
        
//         window.sessions.get(key).write('echo "Hello World"\r')
//       }
//     });
// }
// // exports.decorateMenu   = decorateMenu;
