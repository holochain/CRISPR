use serde_derive::{Deserialize, Serialize};
use holochain_json_derive::DefaultJson;
use hdk::{
    self,
    entry,
    from,
    link,
    entry_definition::ValidatingEntryType,
    holochain_core_types::{
        dna::entry_types::Sharing,
        time::Timeout,
        time::Iso8601,
    },
    holochain_json_api::{
        json::JsonString,
        error::JsonError,
    },
    prelude::*,
    holochain_persistence_api::cas::content::{
        Address,
    }
};

pub mod handlers;
pub mod entry_permissions;
pub mod link_permissions;
pub mod validation;

const PROJECTS_ANCHOR_TYPE: &str = "list_projects";
const PROJECT_ENTRY_LINK_TYPE: &str = "project_link";
const PROJECT_ENTRY_NAME: &str = "project";

#[derive(Serialize, Deserialize, Debug, DefaultJson,Clone)]
#[serde(rename_all = "camelCase")]
pub struct ProjectEntry {
    uuid: String,
	name: String,
	description: String,
	preview: String,
	zome: String,
	order: u32,
}

#[derive(Serialize, Deserialize, Debug, DefaultJson,Clone)]
#[serde(rename_all = "camelCase")]
pub struct Project {
    id: Address,
    created_at: Iso8601,
    created_by: Address,
    address: Address,
    updated_at: Iso8601,
    uuid: String,
	name: String,
	description: String,
	preview: String,
	zome: String,
	order: u32,
}

fn timestamp(address: Address) -> ZomeApiResult<Iso8601> {
    let options = GetEntryOptions{status_request: StatusRequestKind::Latest, entry: false, headers: true, timeout: Timeout::new(10000)};
    let entry_result = hdk::get_entry_result(&address, options)?;
    match entry_result.result {
        GetEntryResultType::Single(entry) => {
            Ok(entry.headers[0].timestamp().clone())
        },
        _ => {
            unreachable!()
        }
    }
}

fn created_by(address: Address) -> ZomeApiResult<Address> {
    let options = GetEntryOptions{status_request: StatusRequestKind::Initial, entry: false, headers: true, timeout: Timeout::new(10000)};
    let entry_result = hdk::get_entry_result(&address, options)?;
    match entry_result.result {
        GetEntryResultType::Single(entry) => {
            match entry.headers[0].provenances().get(0) {
                Some(o) => {
                    Ok(o.source().clone())
                },
                _ => {
                    unreachable!()
                }
            }
        },
        _ => {
            unreachable!()
        }
    }
}

impl Project {
    pub fn new(address: Address, entry: ProjectEntry) -> ZomeApiResult<Project> {
        Ok(Project{
            id: address.clone(),
            created_at: timestamp(address.clone())?,
            created_by: created_by(address.clone())?,
            address: address.clone(),
            updated_at: timestamp(address.clone())?,
            uuid: entry.uuid,
			name: entry.name,
			description: entry.description,
			preview: entry.preview,
			zome: entry.zome,
			order: entry.order,
        })
    }
}

impl Project {
    pub fn existing(id: Address, created_at: Iso8601, address: Address, entry: ProjectEntry) -> ZomeApiResult<Project> {
        Ok(Project{
            id: id.clone(),
            created_at: created_at.clone(),
            created_by: created_by(address.clone())?,
            address: address.clone(),
            updated_at: timestamp(address.clone())?,
            uuid: entry.uuid,
			name: entry.name,
			description: entry.description,
			preview: entry.preview,
			zome: entry.zome,
			order: entry.order,
        })
    }
}

pub fn definition() -> ValidatingEntryType {
    entry!(
        name: PROJECT_ENTRY_NAME,
        description: "The entry with the content.",
        sharing: Sharing::Public,
        validation_package: || {
            hdk::ValidationPackageDefinition::Entry
        },
        validation: | validation_data: hdk::EntryValidationData<ProjectEntry>| {
            match validation_data
            {
                hdk::EntryValidationData::Create{entry, validation_data} =>
                {
                    entry_permissions::validate_permissions_entry_create(entry, validation_data)
                },
                hdk::EntryValidationData::Modify{new_entry, old_entry, old_entry_header, validation_data} =>
                {
                    entry_permissions::validate_permissions_entry_modify(new_entry, old_entry, old_entry_header, validation_data)
                },
                hdk::EntryValidationData::Delete{old_entry, old_entry_header, validation_data} =>
                {
                    entry_permissions::validate_permissions_entry_delete(old_entry, old_entry_header, validation_data)
                }
            }
        },
        links: [
            from!(      
                holochain_anchors::ANCHOR_TYPE,
                link_type: PROJECT_ENTRY_LINK_TYPE,
                validation_package: || {
                    hdk::ValidationPackageDefinition::Entry
                },
                validation: |validation_data: hdk::LinkValidationData| {
                    match validation_data
                    {
                        hdk::LinkValidationData::LinkAdd{link, validation_data} =>
                        {
                            link_permissions::validate_permissions_link_add(link, validation_data)
                        },
                        hdk::LinkValidationData::LinkRemove{link, validation_data} =>
                        {
                            link_permissions::validate_permissions_link_remove(link, validation_data)
                        }
                    }
                }
            )
        ]
    )
}
