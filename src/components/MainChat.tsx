import React,{ useEffect, useState} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import io from 'socket.io-client';

const socket = io.connect('http://192.168.3.114:4000')


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
  }),
);

function MainChat(){
    const [state, setState] = useState({message: '', name: ' '})
    const [chat, setChat ] = useState([] as any)
    const [name,setName] = useState('')    

    useEffect(()=>{
      socket.on('message',({name, message}: any)=>{
        setChat([...chat,{name, message}]);
      })
    })

    const handOnName = (event: any) =>{
      event.preventDefault();
      var name = event.target;
      console.log(event.target.name.value);
      setName(event.target.name.value)

    }
    const handOnChat = (event: any) =>{
      event.preventDefault();
      console.log(event.target.contentChat.value)
      const message = event.target.contentChat.value;
      socket.emit('message',{name , message})
      console.log(name,message)
    }
    const classes = useStyles();

    const RenderChat = ()=>{
      return (
        <div>
           {
              chat.map(({name, message}:any,index:any)=>(
                 <div key={index}>
                   <p>
                     <span className='name' 
                      style={{color: "blue"}}
                     >
                       {name}:   
                     </span>
                     <span className='message'
                     style={{marginLeft: 50}}>
                        {message}
                       </span>
                   </p>
                 </div>
              )) 
           } 
        </div>
      ) 
      
    }    
    const NameInputElement= () =>{
      console.log("naem",name)
      if(name===''){

      
      return (
        <div>
           <form className="haha" noValidate autoComplete="off" 
                  onSubmit={handOnName}
                >
                <TextField id="standard-basic" name="name" label="What is your name?" />
                <Button variant="outlined" color="primary"
                    style={{
                      marginTop: 15,
                      marginLeft: 15
                    }}
                    type="submit"
                >
                    Join
                </Button>
                
                  {/* <button type="submit">Submit form</button> */}
                </form>

        </div>
      
        )
      } else{
        return(
          <div>
            <div className='welcomeUser'>
              <h1>
                Welcome {name}
              </h1>
            </div>
            <div className='chatBox'>
              <form className="contextChatForm" noValidate autoComplete="off" 
                    onSubmit={handOnChat}
                  >
                  
                   <TextField
                      name='contentChat'
                      id="outlined-multiline-static"
                      label="message...."
                      multiline
                      // rows={4}
                      defaultValue=""
                      variant="outlined"
                    />
                    <br></br>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        endIcon={<Icon />}
                        type='submit'
                      >
                        Send
                      </Button>
                    {/* <button type="submit">Submit form</button> */}
                </form>  
            </div>

          </div>
        )
      }
    }
    return(
        <div className='informationContent'>
            <div className='name'>
                           
                    <NameInputElement />
                    </div>
                    <RenderChat />
            
        </div>
    )
}
export default MainChat;

