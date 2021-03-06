use std::convert::TryFrom;
use hdk::{
    error::ZomeApiResult,
    holochain_core_types::{
        entry::Entry,
        time::Iso8601,
    },
    holochain_persistence_api::cas::content::{
        Address,
        AddressableContent,
    },
    prelude::*,
};
use holochain_anchors::anchor;
use crate::note::{
    NOTES_ANCHOR_TYPE,
    NOTE_ENTRY_LINK_TYPE,
    NOTE_ENTRY_NAME,
    NoteEntry,
    Note,
};

fn notes_anchor(anchor_text: String) -> ZomeApiResult<Address> {
    anchor(NOTES_ANCHOR_TYPE.to_string(), anchor_text.to_string())
}

pub fn create(base: String, note_entry: NoteEntry) -> ZomeApiResult<Note> {
    let entry = Entry::App(NOTE_ENTRY_NAME.into(), note_entry.clone().into());
    let entry_address = hdk::commit_entry(&entry)?;
    let note = Note::new(entry_address.clone(), note_entry)?;
    hdk::link_entries(&notes_anchor(base)?, &entry_address, NOTE_ENTRY_LINK_TYPE, &note.created_at.to_string())?;
    Ok(note)
}

pub fn read(id: Address, created_at: Iso8601) -> ZomeApiResult<Note> {
    let note_entry: NoteEntry = hdk::utils::get_as_type(id.clone())?;
    let address = Entry::App(NOTE_ENTRY_NAME.into(), note_entry.clone().into()).address();
    Note::existing(id.clone(), created_at, address, note_entry)
}

pub fn update(id: Address, created_at: Iso8601, address: Address, note_input: NoteEntry) -> ZomeApiResult<Note> {
    let updated_entry_address = hdk::update_entry(Entry::App(NOTE_ENTRY_NAME.into(), note_input.clone().into()), &address.clone())?;
    Note::existing(id.clone(), created_at, updated_entry_address, note_input)
}

pub fn delete(base: String, id: Address, created_at: Iso8601, address: Address) -> ZomeApiResult<Address> {
    hdk::remove_link(&notes_anchor(base)?, &id, NOTE_ENTRY_LINK_TYPE, &created_at.to_string())?;
    hdk::remove_entry(&address)
}

pub fn list(base: String) -> ZomeApiResult<Vec<Note>> {
    hdk::get_links(&notes_anchor(base)?, LinkMatch::Exactly(NOTE_ENTRY_LINK_TYPE), LinkMatch::Any)?.links()
    .iter()
    .map(|link| read(link.address.clone(), Iso8601::try_from(link.tag.clone()).unwrap()))
    .collect()
}

pub fn rebase(base_from: String, base_to: String, id: Address, created_at: Iso8601) -> ZomeApiResult<Address> {
    hdk::remove_link(&notes_anchor(base_from)?, &id, NOTE_ENTRY_LINK_TYPE, &created_at.to_string())?;
    hdk::link_entries(&notes_anchor(base_to)?, &id, NOTE_ENTRY_LINK_TYPE, &created_at.to_string())
}

