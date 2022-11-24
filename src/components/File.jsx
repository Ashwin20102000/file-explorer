import React from 'react'
import keys from '../utils/keys';

const File = ({folder,updateFolder}) => {
  const [opened,setOpened] = React.useState(false);
  const [input,setInput] = React.useState({
    visible:false,
    isFolder:false,
    edit:false,
    name:''
  });
  const addFolderOrFile = (e) => {
    if(e.keyCode === 13  && e.target.value){
      const buildData = {
        id:new Date().getTime()+'',
        isFolder:input.isFolder,
        name:e.target.value,
        folderId:folder.id,
        items:[]
      }
      updateFolder(buildData,keys.ADD);
      setOpened(true);
      e.target.value="";
      setInput(prev=>({...prev,visible:false,isFolder:false}));
    }
  }

  const editFolderOrFile = (e) => {
    if(e.keyCode === 13  && e.target.value){
      const buildData = {
        id:folder.id,
        name:e.target.value,
        folderId:folder.id
      }
      updateFolder(buildData,keys.UPDATE)
      setOpened(true);
      setInput(prev=>({...prev,visible:false,isFolder:false,edit:false}));
    }
  }

  const deleteFolderOrFile = () => {
    updateFolder(folder.id,keys.DELETE);
  }
  const fileType = folder.isFolder ? !opened?'📁 / ':'📂 / ' : '📄';
  const createType = input.isFolder ? '📁' : '📄';
  return (
  <div style={{width:400}}>
    <div style={{display:"flex",alignItems:'center',justifyContent:"space-between"}}>
      {
        input.edit ?
        <div>
          <span>{createType}</span>
          <input onChange={(e=>setInput(prev=>({...prev,name:e.target.value})))} value={input.name||folder.name} autoFocus onKeyDown={e=>editFolderOrFile(e)} onBlur={()=>setInput(input=>({...input,edit:false}))} />
        </div>

        :
       <div onClick={()=>{setOpened(!opened)
          }} style={{cursor:'pointer',padding:'.5em' ,"&:hover":{backgroundColor:"rgb(227 224 224)"}}}
          >{`${fileType} ${folder.name}`}
       </div>
      }
      <div>
        {
          folder.isFolder && <>
          <button onClick={()=>setInput(prev=>({...prev,visible:!input.visible,isFolder:true}))} style={{border:'none',cursor:'pointer'}}>📂+</button>
          <button onClick={()=>setInput(prev=>({...prev,visible:!input.visible,isFolder:false}))} style={{border:'none',margin:2,cursor:'pointer'}}>📄+</button>
          </>
        }
        { !folder.access &&<>
          <button onClick={()=>setInput(prev=>({...prev,edit:true,isFolder:folder.isFolder}))} style={{border:'none',margin:2,cursor:'pointer'}}>🖋️</button>
           <button onClick={()=>deleteFolderOrFile()}
             style={{border:'none',cursor:'pointer'}}>🗑️</button>
        </>
      }
      </div>
    </div>
    {
      input.visible &&
       <div style={{marginLeft:"20px"}}> 
        <span>{createType}</span>
        <input autoFocus onKeyDown={e=>addFolderOrFile(e)} onBlur={()=>setInput(input=>({...input,visible:!input.visible}))} />
      </div>
    }
    {
      opened && <div style={{marginLeft:"20px"}}>
      {
        folder.items.map(item=>(<File key={item.id} folder={item}  updateFolder={updateFolder} />))
      }
      </div>
    }
    </div>
  );
}
export default File;