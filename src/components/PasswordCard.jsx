import { useState, useEffect } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'

const PasswordCard = ({ passwords: propsPasswords, toggleVisibility: propsToggle, copyText: propsCopy, editPassword: propsEdit, deletePassword: propsDelete }) => {
    const [passwords, setPasswords] = useState([])
    const [view, setView] = useState('list')
    const [form, setForm] = useState({ site: '', username: '', password: '' })

    useEffect(() => {
        if (propsPasswords && Array.isArray(propsPasswords)) {
            setPasswords(propsPasswords)
            return
        }

        const raw = localStorage.getItem('passwords')
        if (raw) {
            try {
                const parsed = JSON.parse(raw).map(item => ({ ...item, isVisible: item.hasOwnProperty('isVisible') ? item.isVisible : false }))
                setPasswords(parsed)
            } catch (e) {
                console.error('Failed to parse passwords from localStorage', e)
            }
        }
    }, [propsPasswords])

    const saveToStorage = (arr) => {
        setPasswords(arr)
        localStorage.setItem('passwords', JSON.stringify(arr))
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        if (propsCopy) return propsCopy(text)
        navigator.clipboard.writeText(text)
        toast('Copied to clipboard', { position: 'top-right', autoClose: 2000, theme: 'dark', transition: Bounce })
    }

    const toggleVisibility = (id) => {
        if (propsToggle) return propsToggle(id)
        const updated = passwords.map(p => p.id === id ? { ...p, isVisible: !p.isVisible } : p)
        saveToStorage(updated)
    }

    const deletePassword = (id) => {
        if (propsDelete) return propsDelete(id)
        const ok = confirm('Do you really want to delete this password?')
        if (!ok) return
        const updated = passwords.filter(p => p.id !== id)
        saveToStorage(updated)
        toast('Password deleted', { position: 'top-right', autoClose: 2000, theme: 'dark', transition: Bounce })
    }

    const editPassword = (id) => {
        if (propsEdit) return propsEdit(id)
        const item = passwords.find(p => p.id === id)
        if (!item) return
        // Store for main editor or other component to pick up
        localStorage.setItem('editPassword', JSON.stringify(item))
        toast('Open main editor to continue editing', { position: 'top-right', autoClose: 2500, theme: 'dark', transition: Bounce })
    }
    return (
        <div>
            <div className=" px-4 py-6">
                <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" transition={Bounce} />


                {view === 'list' && (
                    <>

                            <div className="space-y-4">
                                {passwords.map((item) => (
                                    <div key={item.id} className="bg-white border border-green-100 rounded-xl shadow-sm p-4 flex flex-col gap-3">
                                        <div className="flex items-start justify-between gap-3">
                                            <a className="text-sm font-medium text-green-700 break-words truncate max-w-[70%] min-w-0" href={item.site} target="_blank" rel="noreferrer">{item.site}</a>
                                            <div className="flex items-center gap-2 flex-shrink-0"> 
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/xuoapdes.json"
                                                    trigger="hover"
                                                    style={{ width: "20px", height: "20px" }}>
                                                </lord-icon>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between text-sm gap-3">
                                            <div className="text-gray-700 break-words truncate max-w-[70%] min-w-0">{item.username}</div>
                                            <button onClick={() => copyText(item.username)} className="text-xs text-green-600 flex-shrink-0">
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/xuoapdes.json"
                                                    trigger="hover"
                                                    style={{ width: "20px", height: "20px" }}>
                                                </lord-icon>
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between gap-3 flex-wrap">
                                            <div className="text-lg font-mono tracking-wider break-words truncate max-w-full min-w-0">{item.isVisible ? item.password : '••••••••'}</div>
                                            <div className="flex items-center gap-2 flex-wrap justify-end">
                                                <button onClick={() => copyText(item.password)} className="p-2 rounded-md bg-green-50 hover:bg-green-100 text-xs">
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/xuoapdes.json"
                                                        trigger="hover"
                                                        style={{ width: "20px", height: "20px" }}>
                                                    </lord-icon>
                                                </button>
                                                <button onClick={() => toggleVisibility(item.id)} className="p-2 rounded-md bg-green-50 hover:bg-green-100 w-9 h-9 flex items-center justify-center">
                                                    <img width={18} src={item.isVisible ? 'icons/eye.png' : 'icons/eyecross.png'} alt="toggle" />
                                                </button>
                                                <button onClick={() => editPassword(item.id)} className="p-2 rounded-md bg-yellow-50 hover:bg-yellow-100 text-xs">
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/ibckyoan.json"
                                                        trigger="hover"
                                                        style={{ width: "20px", height: "20px" }}>
                                                    </lord-icon>
                                                </button>
                                                <button onClick={() => deletePassword(item.id)} className="p-2 rounded-md bg-red-50 hover:bg-red-100 text-xs">
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/xyfswyxf.json"
                                                        trigger="hover"
                                                        style={{ width: "20px", height: "20px" }}>
                                                    </lord-icon>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        
                    </>
                )}


            </div>
        </div>
    )
}

export default PasswordCard
