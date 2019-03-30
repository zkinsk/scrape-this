class Note {
  constructor (note){
    this.noteId = note._id
    this.artId = note.artId
    this.text = note.body
  }
  drawNote(){
    let note = /*html*/`
      <div class="note d-flex w-100 justify-content-between">
        <p>${this.text}</p>
        <button type="button" data-note-id="${this.noteId}" data-artId="${this.artId}" class="btn btn-sm btn-danger delete-note-button align-self-start"><i class="fas fa-backspace"></i></button>
      </div>
    `;
    $("#note-area").append(note);
  }
}
