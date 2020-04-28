/// NB: The tryorama config patterns are still not quite stabilized.
/// See the tryorama README [https://github.com/holochain/tryorama]
/// for a potentially more accurate example
const path = require('path')

const { Orchestrator, Config, combine, singleConductor, localOnly, tapeExecutor } = require('@holochain/tryorama')

process.on('unhandledRejection', error => {
  // Will print "unhandledRejection err is not defined"
  console.error('got unhandledRejection:', error);
});

const dnaPath = path.join(__dirname, "../dist/dna.dna.json")
const tasksDnaPath = path.join(__dirname, "../../../tasks/dna/dist/dna.dna.json")

const orchestrator = new Orchestrator({
  middleware: combine(
    // use the tape harness to run the tests, injects the tape API into each scenario
    // as the second argument
    tapeExecutor(require('tape')),

    // specify that all "players" in the test are on the local machine, rather than
    // on remote machines
    localOnly,

    // squash all instances from all conductors down into a single conductor,
    // for in-memory testing purposes.
    // Remove this middleware for other "real" network types which can actually
    // send messages across conductors
    // singleConductor,
  )
})

const dna = Config.dna(dnaPath, 'notes-test')
const tasksDna = Config.dna(tasksDnaPath, 'tasks-test')
// const conductorConfig = Config.gen({notes: dna})
const conductorConfig = Config.gen({notes: dna, tasks: tasksDna}, {
  network: {
    type: 'sim2h',
    sim2h_url: 'ws://localhost:9000'
  }
})

orchestrator.registerScenario("Generate config and key for Alice & Bob", async (s, t) => {
  const {alice, bob, phil, lucy} = await s.players({alice: conductorConfig, bob: conductorConfig, phil: conductorConfig, lucy: conductorConfig}, true)
  const aliceNote1 = await alice.call("notes", "notes", "create_note", {"note_input" : {"title":"Set up 2 hour deep dive on CRISPR.", "content":"Find out who creates invite and room\nScript out what to deep dive on"}})
  await alice.call("tasks", "tasks", "create_task", {"base": aliceNote1.Ok.id, "task_input" : {"title":"Set up 2 hour deep dive on CRISPR.", "done": false}})

  // aliceNote1

  await alice.call("notes", "notes", "create_note", {"note_input" : {"title":"Stepper for add new entry", "content":"Setup- for existing"}})
  await alice.call("notes", "notes", "create_note", {"note_input" : {"title":"Scale the zome model surface", "content":"Set it up so the model fits exactly."}})
  await alice.call("notes", "notes", "create_note", {"note_input" : {"title":"Get theme colours", "content":"Use Holochain brand colours."}})
  await s.consistency()

  await bob.call("notes", "notes", "create_note", {"note_input" : {"title":"Agent Id Link", "content":"Add list notes by agent"}})
  await bob.call("notes", "notes", "create_note", {"note_input" : {"title":"Entry type code viewer", "content":"decide on DNA pattern to use for Notes hApp."}})
  await s.consistency()

  await phil.call("notes", "notes", "create_note", {"note_input" : {"title":"DNA Modeller toolbar", "content":"Add the buttons"}})
  await phil.call("notes", "notes", "create_note", {"note_input" : {"title":"Show profile information on each installed app", "content":"Makes it easy to see where your personal data is."}})
  await phil.call("notes", "notes", "create_note", {"note_input" : {"title":"Be able to workflow any entry", "content":"Worflow as a feature you add to existing app."}})
  await s.consistency()

  await lucy.call("notes", "notes", "create_note", {"note_input" : {"title":"Lucy Title first note", "content":"Content first note"}})
  await lucy.call("notes", "notes", "create_note", {"note_input" : {"title":"Lucy Title second note", "content":"Content second note"}})
  await lucy.call("notes", "notes", "create_note", {"note_input" : {"title":"Lucy Title third note", "content":"Content third note"}})
  await lucy.call("notes", "notes", "create_note", {"note_input" : {"title":"Lucy Title fourth note", "content":"Content fourth note"}})
  await s.consistency()
})

orchestrator.run()
