import React, { useEffect, useState } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'

const MobileManager = () => {
  const [passwords, setPasswords] = useState([])
  const [view, setView] = useState('list') // 'list' or 'add'
  const [form, setForm] = useState({ site: '', username: '', password: '' })

  useEffect(() => {
    const raw = localStorage.getItem('passwords')
    if (raw) {
      try {
        const parsed = JSON.parse(raw).map(item => ({ ...item, isVisible: item.hasOwnProperty('isVisible') ? item.isVisible : false }))
        setPasswords(parsed)
      } catch (e) {
        console.error('Failed to parse passwords from localStorage', e)
      }
    }
  }, [])

  const saveToStorage = (arr) => {
    setPasswords(arr)
    localStorage.setItem('passwords', JSON.stringify(arr))
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const savePassword = () => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
      const newPasswordEntry = { ...form, id: uuidv4(), isVisible: false }
      const updated = [...passwords, newPasswordEntry]
      saveToStorage(updated)
      setForm({ site: '', username: '', password: '' })
      setView('list')
      toast('Password saved', { position: 'top-right', autoClose: 2000, theme: 'dark', transition: Bounce })
    } else {
      toast('Error: fill fields correctly', { position: 'top-right', autoClose: 2000, theme: 'dark', transition: Bounce })
    }
  }

  const copyText = (text) => {
    navigator.clipboard.writeText(text)
    toast('Copied to clipboard', { position: 'top-right', autoClose: 2000, theme: 'dark', transition: Bounce })
  }

  const toggleVisibility = (id) => {
    const updated = passwords.map(p => p.id === id ? { ...p, isVisible: !p.isVisible } : p)
    saveToStorage(updated)
  }

  const deletePassword = (id) => {
    const ok = confirm('Do you really want to delete this password?')
    if (!ok) return
    const updated = passwords.filter(p => p.id !== id)
    saveToStorage(updated)
    toast('Password deleted', { position: 'top-right', autoClose: 2000, theme: 'dark', transition: Bounce })
  }

  const editPassword = (id) => {
    // For mobile manager we will navigate the user to the main manager edit flow by
    // storing the chosen item into localStorage under a temp key and letting Manager pick it up.
    const item = passwords.find(p => p.id === id)
    if (!item) return
    localStorage.setItem('editPassword', JSON.stringify(item))
    toast('Open main editor to continue editing', { position: 'top-right', autoClose: 2500, theme: 'dark', transition: Bounce })
  }

  return (
    <div className="md:hidden px-4 py-6">
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" transition={Bounce} />

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{view === 'list' ? 'Your Passwords' : 'Add Password'}</h2>
        {view === 'list' ? (
          <button onClick={() => setView('add')} className="p-2 rounded-full bg-green-50">+</button>
        ) : (
          <button onClick={() => setView('list')} className="p-2 rounded-full bg-red-50">✕</button>
        )}
      </div>

      {view === 'list' && (
        <>
          {passwords.length === 0 ? (
            <div className="text-center text-sm text-gray-600">No passwords to show</div>
          ) : (
            <div className="space-y-4">
              {passwords.map((item) => (
                <div key={item.id} className="bg-white border border-green-100 rounded-xl shadow-sm p-4 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <a className="text-sm font-medium text-green-700 break-words truncate max-w-[70%] min-w-0" href={item.site} target="_blank" rel="noreferrer">{item.site}</a>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button onClick={() => copyText(item.site)} className="p-1 rounded-full bg-green-50 hover:bg-green-100 w-8 h-8 flex items-center justify-center">
                        <img src="icons/github.svg" alt="copy" width={14} className="max-w-full" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm gap-3">
                    <div className="text-gray-700 break-words truncate max-w-[70%] min-w-0">{item.username}</div>
                    <button onClick={() => copyText(item.username)} className="text-xs text-green-600 flex-shrink-0">Copy</button>
                  </div>

                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="text-lg font-mono tracking-wider break-words truncate max-w-full min-w-0">{item.isVisible ? item.password : '••••••••'}</div>
                    <div className="flex items-center gap-2 flex-wrap justify-end">
                      <button onClick={() => copyText(item.password)} className="p-2 rounded-md bg-green-50 hover:bg-green-100 text-xs">Copy</button>
                      <button onClick={() => toggleVisibility(item.id)} className="p-2 rounded-md bg-green-50 hover:bg-green-100 w-9 h-9 flex items-center justify-center">
                        <img width={18} src={item.isVisible ? 'icons/eye.png' : 'icons/eyecross.png'} alt="toggle" />
                      </button>
                      <button onClick={() => editPassword(item.id)} className="p-2 rounded-md bg-yellow-50 hover:bg-yellow-100 text-xs">Edit</button>
                      <button onClick={() => deletePassword(item.id)} className="p-2 rounded-md bg-red-50 hover:bg-red-100 text-xs">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {view === 'add' && (
        <div className="space-y-4">
          <input name="site" value={form.site} onChange={handleChange} className="w-full rounded-full border border-green-500 px-4 py-2" type="text" placeholder="Enter the website URL" />
          <input name="username" value={form.username} onChange={handleChange} className="w-full rounded-full border border-green-500 px-4 py-2" type="text" placeholder="Enter Username" />
          <input name="password" value={form.password} onChange={handleChange} className="w-full rounded-full border border-green-500 px-4 py-2" type="password" placeholder="Enter Password" />
          <div className="flex justify-center">
            <button onClick={savePassword} className="px-5 py-3 rounded-full bg-green-500 text-white">Save</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default MobileManager
