// import React, { useState } from 'react';
// import './codeEditor.css'; // Import your CSS file

// function OnlineCodeEditor({ username }) {
//     const [code, setCode] = useState(''); // State for storing code entered by the user
//     const [output, setOutput] = useState('');

//     const runCode = () => {
//         // Simulate compilation and execution (replace with actual compilation logic)
//         const compiledCode = compileCode(code);

//         // Update the output area with the compiled code
//         setOutput(compiledCode);
//     };

//     const compileCode = (code) => {
//         // Simulate compilation process (replace with actual compilation logic)
//         // For demonstration, just return the entered code
//         return code;
//     };

//     const handleCodeChange = (event) => {
//         // Update the code state when the user types in the textarea
//         setCode(event.target.value);
//     };

//     return (
//         <>
//             <header>
//                 <div className="space">
//                     <h1><b>Online Code Editor</b></h1>
//                     {username && <p>Welcome, {username}!</p>}
//                 </div>
//                 <div className="navbar">
//                     <button className="btn run-btn" onClick={runCode}><i className="fas fa-play"></i> Run code</button>
//                     <button className="btn save-btn"><i className="fas fa-save"></i> Save</button>
//                     <div className="select-container">
//                         <p>Language:</p>
//                         <select className="select">
//                             <option>C</option>
//                             <option>C++</option>
//                             <option>Java</option>
//                             <option>Python</option>
//                         </select>
//                     </div>
//                 </div>
//             </header>
//             <main>
//                 <div className="code-editor">
//                     <textarea
//                         id="code-area"
//                         value={code}
//                         onChange={handleCodeChange}
//                         placeholder="Write your code in this editor and press Run button to compile and execute it."
//                     ></textarea>
//                 </div>
//                 <div className="output-window">
//                     <div id="output-header">Output</div>
//                     <textarea id="output-area" readOnly value={output}></textarea>
//                 </div>
//             </main>
//         </>
//     );
// }

// export default OnlineCodeEditor;


// import React, { useState } from 'react';
// import './codeEditor.css'; // Import your CSS file

// function OnlineCodeEditor({ username }) {
//     const [code, setCode] = useState('');
//     const [output, setOutput] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');

//     const handleCompile = async () => {
//         try {
//             setLoading(true);
//             setError('');

//             const languageId = '48'; // Replace with the language ID of the selected programming language
//             const sourceCodeBase64 = btoa(code); // Base64 encode the source code
//             const stdinBase64 = btoa(''); // Base64 encode stdin (custom input)

//             const url = `${import.meta.env.VITE_RAPID_API_URL}/submissions`;
//             const options = {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
//                     'X-RapidAPI-Host': import.meta.env.VITE_RAPID_API_HOST
//                 },
//                 body: JSON.stringify({
//                     language_id: languageId,
//                     source_code: sourceCodeBase64,
//                     stdin: stdinBase64
//                 })
//             };

//             const response = await fetch(url, options);
//             const result = await response.json();

//             if (!response.ok) {
//                 throw new Error(result.message || 'Failed to compile and execute code');
//             }

//             // Check status of the submission
//             checkStatus(result.token);
//         } catch (error) {
//             setError(error.message || 'An error occurred during compilation and execution');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const checkStatus = async (token) => {
//         try {
//             const url = `${import.meta.env.VITE_RAPID_API_URL}/submissions/${token}`;
//             const options = {
//                 method: 'GET',
//                 headers: {
//                     'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
//                     'X-RapidAPI-Host': import.meta.env.VITE_RAPID_API_HOST
//                 }
//             };

//             const response = await fetch(url, options);
//             console.log(response); // Log the response to inspect its structure



//             if (!response.ok) {
//                 throw new Error(result.message || 'Failed to fetch submission status');
//             }

//             // Check if status is still in queue or processing
//             if (result.statusId === 1 || result.statusId === 2) {
//                 // Retry after a delay
//                 setTimeout(() => {
//                     checkStatus(token);
//                 }, 1000); // Retry after 1 second
//             } else {
//                 // Display output
//                 setOutput(result.stdout);
//             }
//         } catch (error) {
//             setError(error.message || 'An error occurred while checking submission status');
//         }
//     };

//     const handleCodeChange = (event) => {
//         setCode(event.target.value);
//     };

//     return (
//         <>
//             <header>
//                 <div className="space">
//                     <h1><b>Online Code Editor</b></h1>
//                     {username && <p>Welcome, {username}!</p>}
//                 </div>
//                 <div className="navbar">
//                     <button className="btn run-btn" onClick={handleCompile} disabled={loading}><i className="fas fa-play"></i> Compile and Execute</button>
//                 </div>
//             </header>
//             <main>
//                 <div className="code-editor">
//                     <textarea
//                         id="code-area"
//                         value={code}
//                         onChange={handleCodeChange}
//                         placeholder="Write your code in this editor and press Compile and Execute button to compile and execute it."
//                     ></textarea>
//                 </div>
//                 <div className="output-window">
//                     <div id="output-header">Output</div>
//                     {error && <div className="error-message">{error}</div>}
//                     <textarea id="output-area" readOnly value={output}></textarea>
//                 </div>
//             </main>
//         </>
//     );
// }

// export default OnlineCodeEditor;


import React, { useState } from 'react';
import axios from 'axios'; // Import Axios library
import './codeEditor.css'; // Import your CSS file

export default function OnlineCodeEditor({ username }) {
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleCompile = async () => {
        try {
            setLoading(true);
            setError('');

            const response = await axios.post(
                'https://judge0-ce.p.rapidapi.com/submissions',
                {
                    language_id: 50, // Placeholder for the language ID of the selected programming language
                    source_code: btoa(code), // Placeholder for the base64 encoded source code
                    stdin: '' // Placeholder for any standard input if needed
                },
                {
                    params: {
                        base64_encoded: true,
                        fields: '*'
                    },
                    headers: {
                        'content-type': 'application/json',
                        'X-RapidAPI-Key': '30c4ac4686msh1d7332481c60724p19b820jsn171de0552844', // Placeholder for your RapidAPI key
                        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
                    }
                }
            );

            const token = response.data.token;

            if (!token) {
                throw new Error('Token not received');
            }

            // Start checking the status of the submission
            checkSubmissionStatus(token);
        } catch (error) {
            setError(error.message || 'An error occurred during compilation and execution');
        } finally {
            setLoading(false);
        }
    };

    const checkSubmissionStatus = async (token) => {
        try {
            const response = await axios.get(
                `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
                {
                    headers: {
                        'X-RapidAPI-Key': '30c4ac4686msh1d7332481c60724p19b820jsn171de0552844', // Placeholder for your RapidAPI key
                        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
                    }
                }
            );

            const { statusId, stdout } = response.data;

            if (statusId === 1 || statusId === 2) {
                // Status is still in queue or processing, retry after a delay
                setTimeout(() => {
                    checkSubmissionStatus(token);
                }, 1000); // Retry after 1 second
            } else {
                // Display output
                setOutput(stdout);
            }
        } catch (error) {
            setError(error.message || 'An error occurred while checking submission status');
        }
    };

    const handleCodeChange = (event) => {
        setCode(event.target.value);
    };

    return (
        <>
            <header>
                <div className="space">
                    <h1><b>Online Code Editor</b></h1>
                    {username && <p>Welcome, {username}!</p>}
                </div>
                <div className="navbar">
                    <button className="btn run-btn" onClick={handleCompile} disabled={loading}><i className="fas fa-play"></i> RUN Code</button>
                    <div className="select-container">
                        <p>Language:</p>
                        <select className="select">
                            <option>C</option>
                            <option>C++</option>
                            <option>Java</option>
                            <option>Python</option>
                        </select>
                 </div>
                </div>
            </header>
            <main>
                <div className="code-editor">
                    <textarea
                        id="code-area"
                        value={code}
                        onChange={handleCodeChange}
                        placeholder="Write your code in this editor and press Compile and Execute button to compile and execute it."
                    ></textarea>
                </div>
                <div className="output-window">
                    <div id="output-header">Output</div>
                    {error && <div className="error-message">{error}</div>}
                    <textarea id="output-area" readOnly value={output}></textarea>
                </div>
            </main>
        </>
    );
}



// import React, { useState } from 'react';
// import axios from 'axios';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
// import './codeEditor.css';

// function OnlineCodeEditor({ username }) {
//     const [code, setCode] = useState('');
//     const [output, setOutput] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const [selectedLanguage, setSelectedLanguage] = useState(50);

//     const handleCompile = async () => {
//         // Code for compilation
//         try {
//             setLoading(true);
//             setError('');

//             const response = await axios.post(
//                 'https://judge0-ce.p.rapidapi.com/submissions',
//                 {
//                     language_id: selectedLanguage,
//                     source_code: btoa(code),
//                     stdin: ''
//                 },
//                 {
//                     params: {
//                         base64_encoded: true,
//                         fields: '*'
//                     },
//                     headers: {
//                         'content-type': 'application/json',
//                         'X-RapidAPI-Key': '30c4ac4686msh1d7332481c60724p19b820jsn171de0552844',
//                         'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
//                     }
//                 }
//             );

//             const token = response.data.token;

//             if (!token) {
//                 throw new Error('Token not received');
//             }

//            // checkSubmissionStatus(token);
//         } catch (error) {
//             setError(error.message || 'An error occurred during compilation and execution');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleLanguageChange = (event) => {
//         setSelectedLanguage(event.target.value);
//     };

//     const handleCodeChange = (event) => {
//         setCode(event.target.value);
//     };
    
//     return (
//         <>
//             <header>
//                 <div className="space">
//                     <h1><b>Online Code Editor</b></h1>
//                     {username && <p>Welcome, {username}!</p>}
//                 </div>
//                 <div className="navbar">
//                     <button className="btn run-btn" onClick={handleCompile} disabled={loading}><i className="fas fa-play"></i> RUN Code</button>
//                     <div className="select-container">
//                         <p>Language:</p>
//                         <select className="select" onChange={handleLanguageChange} value={selectedLanguage}>
//                             <option value={50}>C</option>
//                             <option value={54}>C++</option>
//                             <option value={62}>Java</option>
//                             <option value={71}>Python</option>
//                         </select>
//                     </div>
//                 </div>
//             </header>
//             <main>
//                 <div className="code-editor">   
//                     <SyntaxHighlighter
//                         language="java" // Change language as needed
//                         style={materialDark}
//                     >
//                         {code}
//                     </SyntaxHighlighter>
//                     <textarea  
//                         id="code-area"
//                         placeholder="Write your code here..."
//                         value={code}
//                         onChange={handleCodeChange}
//                     />
//                 </div>
//                 <div className="output-window">
//                     <div id="output-header">Output</div>
//                     {error && <div className="error-message">{error}</div>}
//                     <textarea id="output-area" readOnly value={output}></textarea>
//                 </div>
//             </main>
//         </>
//     );
// }

// export default OnlineCodeEditor;

