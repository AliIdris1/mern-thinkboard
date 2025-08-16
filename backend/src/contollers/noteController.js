import Note from "../models/Note.js"

export const getAllNotes = async (_, res) => {
    try {
        const notes = await Note.find().sort({createdAt: -1})
        res.status(200).json(notes)
    } catch (error) {
        console.log("Error in getAll controller", error)
        res.status(500).json({messege: "Internal seerver error"})
    }
}


export const getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id)
        if(!note) return res.status(404).json({messege: "User not found"})
        res.status(200).json(note)
    } catch (error) {
        console.log("Error in getNoteById controller", error)
        res.status(500).json({messege: "Internal seerver error"})
    }
}

export const createNote = async (req, res) => {
    try {
        const {title, content} = req.body
        const note = new Note({title:title, content:content})
        
       const Newnote = await note.save()
        res.status(201).json(Newnote)
    } catch (error) {
        console.log("Error in create controller", error)
        res.status(500).json({messege: "Internal seerver error"})
    }

}

export const updateNote = async (req, res) => {
    try {
        const {title, content} = req.body
       const updaeNote = await Note.findByIdAndUpdate(req.params.id,{title:title, content:content}, {new:true})

       if(!updaeNote) return res.status(404).json({messege: "user not found"})
        res.status(200).json({messege: "Note updated sucssfuly"})  
    } catch (error) {
        console.log("Error in update controller", error)
        res.status(500).json({messege: "Internal seerver error"})
    }
}

export const deleteNote = async (req, res) => {
    try {
        const deletedNote  = await Note.findByIdAndDelete(req.params.id)
        if(!deletedNote) return res.status(404).json({messege: "User not found"})
        res.status(200).send({messege: "Note deleted sucssfully"})
    } catch (error) {
        onsole.log("Error in delete controller", error)
        res.status(500).json({messege: "Internal seerver error"})
    }
}