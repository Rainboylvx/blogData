const { readdirSync }           = require( 'fs')
const { fileURLToPath }         = require( 'url')
const { dirname ,join,relative} = require('path')

exports.abs_path =  function (__filename,filename){
  const __dirname = dirname(__filename)
  console.log( "1",__filename)
  function find_git(__path){
    if( __path == '/') return __path
      let fl = readdirSync(__path)
      if( fl.indexOf('.git') != -1)
        return __path;
    return find_git(join(__path,'..'))
  }

  let git_path = find_git(__dirname)
  return '/' + relative( git_path,filename)
}

