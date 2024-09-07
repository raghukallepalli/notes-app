import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { NotesService } from "./notes.service";
import { Note } from "./note";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  @ViewChild("notesForm") notesForm: NgForm;

  enableForm = false;

  dummyNote: any = {
    title: "",
    body: "",
    color: "",
    favourite: false,
  };

  notes: Note[] = [
    {
      id: 1,
      title: "Mock Title",
      body: "mock body",
      color: "#ff0000",
      favourite: true,
    },
  ];
  selected: Partial<Note>;

  constructor(private service: NotesService) {}

  ngOnChanges() {
    if (!this.notesForm) {
    }
  }

  ngOnInit() {
    // this.notesForm.setValue({});
    this.loadNotes();
  }

  getNotes() {
    return this.notes;
  }

  private loadNotes(): void {
    this.notes = this.service.getNotes();
    // TODO: Retrieve a list of notes from the service and store them locally
  }

  selectNote(note) {
    this.enableForm = true;
    // TODO: prevent changing original object
    this.selected = { ...note };
    let formNote = { ...note };
    delete formNote.id;
    this.notesForm.setValue(formNote);
  }

  newNote() {
    this.selected = {};
  }

  saveNote(note) {
    this.service.saveNote(note);
    this.selected = this.notes[this.notes.length - 1];
    // TODO: save note
  }

  onSubmit() {
    let note: Note = this.notesForm.value;
    if (this.selected != null) {
      this.editNote(note);
      return;
    }
    this.saveNote(note);
  }

  addActiveClass(note: any) {
    return this.selected && this.selected.id == note.id;
  }

  appplyFavorite(note: any) {
    return note.favourite;
  }

  applyColor(note) {
    return note.color;
  }

  editNote(note: any) {
    let index = this.notes.findIndex((nt) => nt.id == this.selected.id);

    note.id = this.notes[index].id;
    this.notes[index] = note;
  }
}
