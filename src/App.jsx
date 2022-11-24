import React from 'react'
import './App.css'
import File from './components/File';
import explorer from './data/fileExplorer'
import useTraverseTree from './hooks/useTraverseTree'
import keys from './utils/keys';

function App() {
  const [folder,setFolder] = React.useState(explorer);
  const { addFolder , editFolder ,deleteFolder } = useTraverseTree();
  const updateFolder = (newFolder,key) => {
    let newTree = folder;
    if(keys.ADD===key){
      const { folderId,isFolder } = newFolder;
      delete newFolder.folderId;
      newTree = addFolder(folder,folderId,isFolder,newFolder);
    }
    if(keys.UPDATE === key){
      const {name,folderId,isFolder} = newFolder;
      delete newFolder.folderId;
      newTree = editFolder(folder,folderId,isFolder,name);
    }

    if(keys.DELETE === key){
      console.log({newFolder});
      newTree = deleteFolder(folder,newFolder);
      console.log({newTree});
    }
  
    setFolder(newTree);
  }
  return (
    <div className="App">
      <File updateFolder={updateFolder} folder= {folder}  />
    </div>
  )
}

export default App
