const useTraversTree = () => {
  const addFolderToTree = (tree,folderId,isFolder,newData) => {
    if(tree.isFolder && tree.id === folderId){
      const {items} = tree;
      return {...tree,items:[...items,newData]};
    }
    let items = [];
    items = tree?.items?.map((node)=>(addFolderToTree(node,folderId,isFolder,newData)));
    return {...tree,items};
  }
  const updateFolderToTree = (tree,folderId,isFolder,name) => {
    if(tree.id === folderId){
      return {...tree,name}
    }
    let items = [];
    items = tree?.items?.map((node)=>(updateFolderToTree(node,folderId,isFolder,name)));
    return {...tree,items};
  }


  const deleteFolderToTree = (tree,folderId)=> {
    console.log({trre:tree.id,folderId});
    if(tree.id === folderId){
      return false
    }
    let items = [];
    items = tree?.items?.filter((node)=>(deleteFolderToTree(node,folderId)));
    return {...tree,items};
  }
  return  {
    addFolder: addFolderToTree,
    editFolder : updateFolderToTree,
    deleteFolder: deleteFolderToTree
  }
}

export default useTraversTree;