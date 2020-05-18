  scenario("anyone-delete-origin", async (s, t) => {
    const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true)
    const create_origin_result = await alice.call("originszome", "originszome", "create_origin", createParams)
    await s.consistency()
    const list_origins_result = await alice.call("originszome", "originszome", "list_origins", {"base": "testbase"})
    t.deepEqual(list_origins_result.Ok.length, 1)
    await bob.call("originszome", "originszome", "delete_origin", {"base": "testbase", "id": create_origin_result.Ok.id, "created_at": create_origin_result.Ok.createdAt, "address": create_origin_result.Ok.address })
    await s.consistency()
    const list_origins_result_2 = await alice.call("originszome", "originszome", "list_origins", {"base": "testbase"})
    t.deepEqual(list_origins_result_2.Ok.length, 0)
  })