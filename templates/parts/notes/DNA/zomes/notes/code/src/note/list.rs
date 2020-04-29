pub fn list(base: String) -> ZomeApiResult<Vec<Note>> {
    hdk::get_links(&notes_anchor(base)?, LinkMatch::Exactly(NOTE_ENTRY_LINK_TYPE), LinkMatch::Any)?.links()
    .iter()
    .map(|link| read(link.address.clone(), Iso8601::try_from(link.tag.clone()).unwrap()))
    .collect()
}