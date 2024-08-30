import { FaMagic } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa";
import { useState , useCallback , useRef , useEffect} from "react";

function App() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(6);
  const [lowcase, setLowcase] = useState(false);
  const [upcase, setUpcase] = useState(false);
  const [digits, setDigits] = useState(false);
  const [spchar, setSpchar] = useState(false);

  const passwordLogic = useCallback(() => {
    let genpass = "";
    let upcasestr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(lowcase)  upcasestr += "abcdefghijklmnopqrstuvwxyz"
    if(digits) upcasestr +="1234567890"
    if(spchar) upcasestr += "!@#$%^&*-_+=[]{}~`"

    for(let i= 0 ; i <= length ; i++){
      let totalcharector = Math.floor(Math.random() * upcasestr.length + 1)
      genpass += upcasestr.charAt(totalcharector)
    }
    setPassword(genpass)

  }, [length, lowcase, upcase, digits, spchar]);

  useEffect(()=>{passwordLogic()},[length, lowcase, upcase, digits, spchar])

  const copytext = ()=>{
    window.navigator.clipboard.writeText(password)
  }
  return (
    <>
      <div className='h-screen w-full bg-black flex justify-center items-center'>
        <div className='w-80 rounded-md h-5/6 lg:h-96 absolute top-3'>
          
          <div className="w-full h-12 border rounded-md relative top-3 text-xl flex items-center">
            <input 
              className="w-full h-full z-0 pl-3 pr-10 rounded-md cursor-pointer" 
              type="text"
              value={password}
              readOnly
              required
              disabled
              style={{
                backgroundColor: 'slategray',
                cursor: 'not-allowed'
              }}
            />
          </div>
          <div className="w-full h-12 border rounded-md relative top-6 text-xl flex justify-center items-center gap-3 text-white cursor-pointer" onClick={copytext} ><FaRegCopy/>Copy To Clipboard</div>
          <div className="w-full h-auto relative top-9 border rounded-md flex flex-col items-center">
            
            <div className="w-72 h-16 m-4 border rounded-md text-white flex items-center">
              <label className="text-xl pl-2">Range: {length}</label>
              <input
                type="range"
                value={length}
                min={6}
                max={100}
                onChange={(e) => setLength(e.target.value)}
                className="ml-2"
              />
            </div>
            <div className="w-72 h-16 m-4 border rounded-md text-white flex items-center">
              <label className="text-xl pl-2">Uppercase Letter: </label>
              <input
                type="checkbox"
                checked={upcase}
                onChange={() => {setUpcase((e)=>!e)}}
                className="float-right ml-auto mr-2"
              />
            </div>
            <div className="w-72 h-16 m-4 border rounded-md text-white flex items-center">
              <label className="text-xl pl-2">Lowercase Letter: </label>
              <input
                type="checkbox"
                checked={lowcase}
                onChange={() =>{ setLowcase((e)=>!e)}}
                className="float-right ml-auto mr-2"
              />
            </div>
            <div className="w-72 h-16 m-4 border rounded-md text-white flex items-center">
              <label className="text-xl pl-2">Digits: </label>
              <input
                type="checkbox"
                checked={digits}
                onChange={() =>{ setDigits((e)=>!e)}}
                className="float-right ml-auto mr-2"
              />
            </div>
            <div className="w-72 h-16 m-4 border rounded-md text-white flex items-center">
              <label className="text-xl pl-2">Special Character: </label>
              <input
                type="checkbox"
                checked={spchar}
                onChange={() =>{ setSpchar((e)=>!e)}}
                className="float-right ml-auto mr-2"
              />
            </div>
          </div>
          <div className="w-full h-12 text-white border relative top-12 rounded-md flex justify-center items-center gap-3 text-xl">
            <FaMagic />Generate Automatically
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
