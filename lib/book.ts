// lib/books.ts

export type Book = {
    id?: string
    title: string
    author: string
    hint?: string
    summary?: string
    firstLine?: string
    quote?: string
  }
  
  export const booksByGenre: Record<string, Book[]> = {
    fantasy: [
        {
          id: "1",
          title: "Harry Potter and the Sorcerer's Stone",
          author: "J.K. Rowling",
          summary:
            "An orphaned boy with a lightning bolt scar finds out he’s a wizard and heads to a magical school where adventure (and trouble) awaits.",
          quote: "You're a wizard, Harry... and things are about to get wild!",
        },
        {
          id: "2",
          title: "The Hobbit",
          author: "J.R.R. Tolkien",
          summary:
            "A cozy-loving hobbit gets dragged on a dangerous quest to help dwarves reclaim their stolen treasure from a very grumpy dragon.",
          quote: "Even the smallest feet can change the course of the future.",
        },
        {
          id: "3",
          title: "A Court of Thorns and Roses",
          author: "Sarah J. Maas",
          summary:
            "A mortal girl is swept into a faerie world full of beauty, danger, and very complicated romance after killing the wrong wolf.",
          quote: "Beauty and the Beast... but make it fae and deadly.",
        },
        {
          id: "4",
          title: "The Name of the Wind",
          author: "Patrick Rothfuss",
          summary:
            "A gifted boy grows up to be the most legendary magician the world has ever seen — but first, he’s got a LOT of mistakes to make.",
          quote: "A hero’s tale... from the hero himself (sort of).",
        },
        {
          id: "5",
          title: "Mistborn: The Final Empire",
          author: "Brandon Sanderson",
          summary:
            "In a world where ash falls from the sky, a street thief discovers she can 'burn' metals for magical powers — and joins a rebellion to topple an immortal emperor.",
          quote: "When the world is broken, it’s time to burn some metal and fight back.",
        },
        {
          id: "6",
          title: "Percy Jackson and the Olympians: The Lightning Thief",
          author: "Rick Riordan",
          summary:
            "A kid finds out he’s a demigod (son of a Greek god!) and must recover Zeus's stolen lightning bolt before all the gods go to war.",
          quote: "Being a half-blood is dangerous... but pretty cool too.",
        },
        {
          id: "7",
          title: "The Cruel Prince",
          author: "Holly Black",
          summary:
            "A mortal girl raised in the brutal world of faeries learns to play dangerous games of politics, power, and maybe even love.",
          quote: "In Faerie, betrayal is basically a love language.",
        },
        {
          id: "8",
          title: "The Priory of the Orange Tree",
          author: "Samantha Shannon",
          summary:
            "Epic queens, deadly dragons, ancient prophecies — and a world that desperately needs saving before it burns down (literally).",
          quote: "Fire, magic, and queens who don’t need rescuing.",
        },
        {
          id: "9",
          title: "Eragon",
          author: "Christopher Paolini",
          summary:
            "A poor farm boy finds a mysterious dragon egg and gets thrust into a wild journey full of battles, ancient secrets, and destiny stuff.",
          quote: "When your pet dragon becomes your best friend AND your battle buddy.",
        },
        {
          id: "10",
          title: "An Ember in the Ashes",
          author: "Sabaa Tahir",
          summary:
            "A girl disguises herself to spy for the resistance against a brutal empire, while a soldier secretly dreams of freedom instead of violence.",
          quote: "When hope burns brighter than fear.",
        },
        {
          id: "11",
          title: "Children of Blood and Bone",
          author: "Tomi Adeyemi",
          summary:
            "Magic has vanished from the land, but a fearless girl is determined to bring it back — even if the cost is everything she loves.",
          quote: "Magic is not dead... if you’re brave enough to fight for it.",
        },
        {
          id: "12",
          title: "The Stardust Thief",
          author: "Chelsea Abdullah",
          summary:
            "A girl who hunts magical relics and a cowardly prince are forced to team up on a desert adventure full of djinn, lies, and cursed treasures.",
          quote: "In a world of magic, the biggest trick is survival.",
        },
        {
          id: "13",
          title: "Shadow and Bone",
          author: "Leigh Bardugo",
          summary:
            "A soldier discovers she has a rare, world-changing magic — but mastering it means choosing between loyalty, power, and love.",
          quote: "Sometimes light shines brightest in the darkest places.",
        },
        {
          id: "14",
          title: "The Atlas Six",
          author: "Olivie Blake",
          summary:
            "Six brilliant magicians are recruited for a secret society that guards magical knowledge — but not all of them will survive the initiation.",
          quote: "Magic, ambition, betrayal — who will be left standing?",
        },
        {
          id: "15",
          title: "Legends and Lattes",
          author: "Travis Baldree",
          summary:
            "An orc warrior hangs up her sword to open a cozy coffee shop in a fantasy town... but even latte dreams come with a side of trouble.",
          quote: "Coffee, cozy vibes, and a sprinkle of sword fights.",
        },
      ],
      
      mystery: [
        {
          id: "1",
          title: "The Girl with the Dragon Tattoo",
          author: "Stieg Larsson",
          summary:
            "A journalist and a hacker investigate a decades-old disappearance, uncovering a twisted family secret and a much darker conspiracy.",
          quote: "The truth will set you free. But first, it will piss you off.",
        },
        {
          id: "2",
          title: "Gone Girl",
          author: "Gillian Flynn",
          summary:
            "A woman disappears, and her husband becomes the prime suspect. As the investigation unfolds, dark secrets of their marriage come to light.",
          quote: "The cool girl is a lie.",
        },
        {
          id: "3",
          title: "The Da Vinci Code",
          author: "Dan Brown",
          summary:
            "A Harvard symbologist and a cryptologist race through Europe to solve a murder mystery tied to a religious secret that could change the world.",
          quote: "The truth is always hidden in plain sight.",
        },
        {
          id: "4",
          title: "Big Little Lies",
          author: "Liane Moriarty",
          summary:
            "Three women’s seemingly perfect lives begin to unravel after a school trivia night ends in murder, and everyone has a secret to hide.",
          quote: "Sometimes it’s the little lies that turn out to be the most lethal.",
        },
        {
          id: "5",
          title: "The Woman in White",
          author: "Wilkie Collins",
          summary:
            "A young woman’s life is thrown into chaos when she meets a mysterious woman dressed in white, who reveals a dark family secret.",
          quote: "The greatest mystery of all is the one hidden in plain sight.",
        },
        {
          id: "6",
          title: "In the Woods",
          author: "Tana French",
          summary:
            "A detective with a traumatic past investigates a child’s murder in a small town, where he begins to confront the dark memories of his own childhood.",
          quote: "The past is a secret we must keep locked away.",
        },
        {
          id: "7",
          title: "The Silent Patient",
          author: "Alex Michaelides",
          summary:
            "A renowned artist shoots her husband in the face and then goes silent. A psychotherapist becomes obsessed with uncovering the truth behind her silence.",
          quote: "She chose silence. And that’s the only thing I need to know.",
        },
        {
          id: "8",
          title: "And Then There Were None",
          author: "Agatha Christie",
          summary:
            "Ten strangers are invited to a remote island, only to find themselves picked off one by one. Who will survive, and who is the killer?",
          quote: "Ten little soldiers went out to dine; one choked his little self and then there were nine.",
        },
        {
          id: "9",
          title: "The Secret History",
          author: "Donna Tartt",
          summary:
            "A group of college students, led by a charismatic professor, becomes entangled in a murder and its dark aftermath, as guilt and betrayal tear them apart.",
          quote: "The truth isn’t always beautiful, but the lack of it can be devastating.",
        },
        {
          id: "10",
          title: "The Cuckoo's Calling",
          author: "Robert Galbraith",
          summary:
            "A disgraced detective investigates the apparent suicide of a supermodel, only to uncover a trail of lies, deceit, and murder.",
          quote: "Everyone lies. The question is how well you can hide it.",
        },
        {
          id: "11",
          title: "Sharp Objects",
          author: "Gillian Flynn",
          summary:
            "A journalist returns to her hometown to investigate a series of brutal murders, only to find herself entangled in the secrets of her own family.",
          quote: "You can never escape the past, no matter how far you run.",
        },
        {
          id: "12",
          title: "The No. 1 Ladies' Detective Agency",
          author: "Alexander McCall Smith",
          summary:
            "A female detective in Botswana solves cases with wit, charm, and a good heart, proving that a little kindness goes a long way.",
          quote: "The world’s greatest detective may not be the one who solves the case, but the one who listens.",
        },
        {
          id: "13",
          title: "The Reversal",
          author: "Michael Connelly",
          summary:
            "Defense attorney Mickey Haller is asked to reverse a conviction of a man who has been in prison for decades, but his investigation leads him to unexpected places.",
          quote: "Justice is a powerful thing, but it’s not always served in the way you expect.",
        },
        {
          id: "14",
          title: "Before I Go to Sleep",
          author: "S.J. Watson",
          summary:
            "Every day, a woman wakes up with no memory of her past. As she begins to uncover the truth about her life, she realizes that someone has been lying to her.",
          quote: "Memory is a powerful thing, but it can also be a dangerous thing.",
        },
        {
          id: "15",
          title: "The Girl on the Train",
          author: "Paula Hawkins",
          summary:
            "A woman with a troubled past becomes obsessed with a couple she watches every day from her train. When the woman goes missing, she finds herself caught in a web of lies.",
          quote: "What you see on the surface is never the full story.",
        },
      ],
      
    romance: [
        {
          id: "1",
          title: "Pride and Prejudice",
          author: "Jane Austen",
          summary:
            "In old England, a sassy woman with sharp wit battles with a brooding rich guy — until pride and misunderstandings slowly turn into love.",
          quote: "A truth universally acknowledged... and wildly misinterpreted!",
        },
        {
          id: "2",
          title: "Me Before You",
          author: "Jojo Moyes",
          summary:
            "A quirky young woman becomes a caregiver for a wealthy man left paralyzed after an accident, and they end up changing each other's lives forever.",
          quote: "You only get one life. Make it ridiculously amazing.",
        },
        {
          id: "3",
          title: "The Notebook",
          author: "Nicholas Sparks",
          summary:
            "A summer romance between a poor boy and a rich girl is torn apart by life — but true love has a sneaky way of sticking around through the years.",
          quote: "If you're a bird, I'm a bird!",
        },
        {
          id: "4",
          title: "Outlander",
          author: "Diana Gabaldon",
          summary:
            "A 1940s nurse accidentally time-travels to 1700s Scotland, where she meets a handsome warrior and history (plus a LOT of romance) gets rewritten.",
          quote: "Kilts, castles, and a time-traveling heart.",
        },
        {
          id: "5",
          title: "The Time Traveler’s Wife",
          author: "Audrey Niffenegger",
          summary:
            "A man keeps involuntarily time-hopping, making his relationship with his wife a tangled but beautiful adventure through moments big and small.",
          quote: "Love doesn't care about clocks or calendars.",
        },
        {
          id: "6",
          title: "Twilight",
          author: "Stephenie Meyer",
          summary:
            "A teenage girl moves to a rainy town and falls in love with a sparkly vampire who’s been 17 for, like, a hundred years.",
          quote: "When your boyfriend sparkles... literally.",
        },
        {
          id: "7",
          title: "To All the Boys I've Loved Before",
          author: "Jenny Han",
          summary:
            "A high school girl's secret love letters accidentally get mailed out, causing major chaos — and unexpected real romance.",
          quote: "When love letters go rogue!",
        },
        {
          id: "8",
          title: "It Ends with Us",
          author: "Colleen Hoover",
          summary:
            "A girl from a tough background falls for a charming neurosurgeon, but love gets complicated when past wounds resurface.",
          quote: "Sometimes the strongest love... is loving yourself first.",
        },
        {
          id: "9",
          title: "The Hating Game",
          author: "Sally Thorne",
          summary:
            "Two work rivals play endless pranks on each other, but underneath all that hate? Some serious fireworks are brewing.",
          quote: "Love and hate are just two sides of the same office memo.",
        },
        {
          id: "10",
          title: "Beach Read",
          author: "Emily Henry",
          summary:
            "A romance writer who no longer believes in love and a literary fiction writer stuck in a rut swap genres — and maybe hearts too — during one summer by the lake.",
          quote: "Writer's block never looked this romantic.",
        },
        {
          id: "11",
          title: "People We Meet on Vacation",
          author: "Emily Henry",
          summary:
            "Two best friends take yearly vacations together... until one trip ruins everything. Now they get one last shot at fixing it (and maybe falling in love).",
          quote: "Sometimes your forever person was always your travel buddy.",
        },
        {
          id: "12",
          title: "The Kiss Quotient",
          author: "Helen Hoang",
          summary:
            "An autistic woman hires an escort to help her figure out dating — and ends up discovering much more about love (and herself) than she ever expected.",
          quote: "Love isn't a math problem... but sometimes it feels like one.",
        },
        {
          id: "13",
          title: "Red, White & Royal Blue",
          author: "Casey McQuiston",
          summary:
            "The First Son of America and the Prince of England go from enemies to something a lot more complicated (and way sweeter).",
          quote: "Politics, royalty, and heart-eyes emoji everywhere.",
        },
        {
          id: "14",
          title: "Call Me by Your Name",
          author: "André Aciman",
          summary:
            "In an idyllic Italian summer, a teenager and his father's guest experience an intense, unforgettable first love.",
          quote: "Peaches, summer, and heartbreaks that never quite leave you.",
        },
        {
          id: "15",
          title: "Love and Other Words",
          author: "Christina Lauren",
          summary:
            "Childhood best friends who drifted apart are reunited years later, digging up all the feelings and secrets they thought they'd buried.",
          quote: "The right words — and the right person — can change everything.",
        },
      ],
      
      classics: [
        {
          id: "1",
          title: "The Great Gatsby",
          author: "F. Scott Fitzgerald",
          summary:
            "A mysterious millionaire throws extravagant parties in hopes of rekindling his lost love, but the American Dream isn’t all it seems.",
          quote: "So we beat on, boats against the current, borne back ceaselessly into the past.",
        },
        {
          id: "2",
          title: "Pride and Prejudice",
          author: "Jane Austen",
          summary:
            "A headstrong young woman and a brooding gentleman clash with their pride and prejudices, but love, as always, finds a way.",
          quote: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
        },
        {
          id: "3",
          title: "Moby-Dick",
          author: "Herman Melville",
          summary:
            "A sailor joins a captain obsessed with hunting a great white whale, and their dangerous journey becomes an exploration of fate, revenge, and obsession.",
          quote: "Call me Ishmael. I go to sea whenever I get bored.",
        },
        {
          id: "4",
          title: "Wuthering Heights",
          author: "Emily Brontë",
          summary:
            "A love story turned dark as Heathcliff and Catherine’s passionate but destructive relationship wreaks havoc on everyone around them.",
          quote: "I am Heathcliff! He's always, always in my mind.",
        },
        {
          id: "5",
          title: "Frankenstein",
          author: "Mary Shelley",
          summary:
            "A scientist creates life from the dead, but the monster he creates turns out to be anything but what he expected, leading to tragedy and horror.",
          quote: "Beware; for I am fearless, and therefore powerful.",
        },
        {
          id: "6",
          title: "Jane Eyre",
          author: "Charlotte Brontë",
          summary:
            "A young orphan becomes a governess at a mysterious mansion and falls for its enigmatic owner, uncovering dark secrets about his past.",
          quote: "I am no bird; and no net ensnares me: I am a free human being with an independent will.",
        },
        {
          id: "7",
          title: "Les Misérables",
          author: "Victor Hugo",
          summary:
            "A former convict seeks redemption in post-revolutionary France, while a cast of unforgettable characters wrestles with love, justice, and the law.",
          quote: "To love another person is to see the face of God.",
        },
        {
          id: "8",
          title: "The Picture of Dorian Gray",
          author: "Oscar Wilde",
          summary:
            "A young man’s portrait ages while he remains forever youthful, allowing him to indulge in a life of hedonism — with deadly consequences.",
          quote: "The only way to get rid of a temptation is to yield to it.",
        },
        {
          id: "9",
          title: "Dracula",
          author: "Bram Stoker",
          summary:
            "A vampire lord named Count Dracula comes to England, bringing chaos and horror in his wake, as a group of people try to stop him.",
          quote: "I am Dracula, and I bid you welcome.",
        },
        {
          id: "10",
          title: "The Odyssey",
          author: "Homer",
          summary:
            "A hero struggles to return home after the Trojan War, facing gods, monsters, and his own fate along the way.",
          quote: "Of all the creatures that live and breathe, none are so unhappy as man.",
        },
        {
          id: "11",
          title: "Crime and Punishment",
          author: "Fyodor Dostoevsky",
          summary:
            "A young student commits a crime, believing it to be justified, but is tormented by guilt and his own conscience in the aftermath.",
          quote: "The man who has a conscience suffers whilst acknowledging his sin. That is his punishment—as well as prison.",
        },
        {
          id: "12",
          title: "The Scarlet Letter",
          author: "Nathaniel Hawthorne",
          summary:
            "A woman in Puritan New England bears an illegitimate child and is forced to wear a scarlet 'A' on her chest as punishment, but it becomes a symbol of strength.",
          quote: "We dream in our waking moments, and walk in our sleep.",
        },
        {
          id: "13",
          title: "Anna Karenina",
          author: "Leo Tolstoy",
          summary:
            "A married woman embarks on a passionate affair with a dashing officer, leading to scandal, heartbreak, and tragedy in 19th-century Russia.",
          quote: "All happy families are alike; each unhappy family is unhappy in its own way.",
        },
        {
          id: "14",
          title: "The Call of the Wild",
          author: "Jack London",
          summary:
            "A dog, stolen from his comfortable home and sold into the harsh wilderness, must tap into his primal instincts to survive and thrive.",
          quote: "The wilderness had laws of its own, and Buck was learning them.",
        },
        {
          id: "15",
          title: "The Brothers Karamazov",
          author: "Fyodor Dostoevsky",
          summary:
            "Three brothers, each deeply flawed, grapple with issues of faith, morality, and the meaning of life in a Russia teeming with philosophical debates.",
          quote: "If God does not exist, everything is permitted.",
        },
      ],
      
      scifi: [
        {
          id: "1",
          title: "Dune",
          author: "Frank Herbert",
          summary:
            "A young nobleman becomes embroiled in a deadly struggle for control of the desert planet Arrakis, the only source of a powerful substance known as 'spice.'",
          quote: "He who controls the spice controls the universe.",
        },
        {
          id: "2",
          title: "The Hitchhiker's Guide to the Galaxy",
          author: "Douglas Adams",
          summary:
            "After Earth is destroyed to make way for an intergalactic highway, Arthur Dent embarks on a quirky journey through space with his alien friend Ford Prefect.",
          quote: "Don't Panic.",
        },
        {
          id: "3",
          title: "Neuromancer",
          author: "William Gibson",
          summary:
            "A washed-up hacker is hired for one last job, which leads him into the digital underworld of cyberspace, where he must confront his past and the dangerous forces at play.",
          quote: "The sky above the port was the color of television, tuned to a dead channel.",
        },
        {
          id: "4",
          title: "Snow Crash",
          author: "Neal Stephenson",
          summary:
            "In a futuristic world dominated by virtual reality, a hacker and a samurai team up to stop a new form of digital virus that threatens the world’s information network.",
          quote: "The future is a dark place.",
        },
        {
          id: "5",
          title: "The Left Hand of Darkness",
          author: "Ursula K. Le Guin",
          summary:
            "A human envoy travels to an icy planet inhabited by a unique species with no fixed gender, forcing him to question his perceptions of humanity and society.",
          quote: "The only lasting truth is change.",
        },
        {
          id: "6",
          title: "The Martian",
          author: "Andy Weir",
          summary:
            "Stranded alone on Mars, astronaut Mark Watney must use his ingenuity and humor to survive until rescue, all while battling against harsh conditions and isolation.",
          quote: "I'm going to science the shit out of this.",
        },
        {
          id: "7",
          title: "Foundation",
          author: "Isaac Asimov",
          summary:
            "A mathematician develops a theory that can predict the fall of the Galactic Empire and sets in motion a plan to preserve knowledge and civilization for the future.",
          quote: "Violence is the last refuge of the incompetent.",
        },
        {
          id: "8",
          title: "Altered Carbon",
          author: "Richard K. Morgan",
          summary:
            "In a future where consciousness can be transferred between bodies, a former soldier is hired to investigate the apparent suicide of a wealthy aristocrat.",
          quote: "The future is a terrible place, but that doesn’t mean we shouldn’t go there.",
        },
        {
          id: "9",
          title: "Hyperion",
          author: "Dan Simmons",
          summary:
            "Seven pilgrims on a distant planet share their tales of tragedy, love, and mystery, all while on a journey that may determine the fate of humanity.",
          quote: "The road to hell is paved with good intentions.",
        },
        {
          id: "10",
          title: "Ready Player One",
          author: "Ernest Cline",
          summary:
            "In a dystopian future, a teenager embarks on a quest in a virtual reality world to find an Easter egg that will grant him unimaginable wealth and power.",
          quote: "The OASIS was the world's most powerful virtual reality game.",
        },
        {
          id: "11",
          title: "The Windup Girl",
          author: "Paolo Bacigalupi",
          summary:
            "In a future where biotechnology and environmental collapse have reshaped the world, a genetically engineered woman becomes the center of a power struggle in Thailand.",
          quote: "The windup girl is a beast that was never meant to live.",
        },
        {
          id: "12",
          title: "Brave New World",
          author: "Aldous Huxley",
          summary:
            "In a utopian future, society is controlled by genetic engineering, mind-altering drugs, and a rigid caste system. One man tries to break free from this artificial world.",
          quote: "Community, Identity, Stability.",
        },
        {
          id: "13",
          title: "The Time Machine",
          author: "H.G. Wells",
          summary:
            "A Victorian scientist invents a machine that allows him to travel through time, leading him to witness the future rise and fall of humanity.",
          quote: "We are always in a hurry to be somewhere.",
        },
        {
          id: "14",
          title: "The Forever War",
          author: "Joe Haldeman",
          summary:
            "A soldier returns from a distant war to find that time dilation has made him a stranger to his own society, and the war itself continues with no end in sight.",
          quote: "War is the ultimate expression of human irrationality.",
        },
        {
          id: "15",
          title: "I, Robot",
          author: "Isaac Asimov",
          summary:
            "A collection of interconnected short stories explores the development of robots and their interaction with humanity, based on Asimov’s famous Three Laws of Robotics.",
          quote: "The Three Laws of Robotics were meant to protect humanity, but sometimes even the best of intentions go awry.",
        },
      ],
      
    horror: [
        {
          id: "1",
          title: "The Shining",
          author: "Stephen King",
          summary:
            "A family moves into an isolated hotel for the winter where a sinister presence influences the father into violence, while his psychic son sees horrific forebodings from the past and future.",
          quote: "All work and no play makes Jack a dull boy.",
        },
        {
          id: "2",
          title: "It",
          author: "Stephen King",
          summary:
            "A group of children in a small town confront an ancient, shape-shifting evil that emerges from the sewer every 27 years to prey on the town's children.",
          quote: "We all float down here.",
        },
        {
          id: "3",
          title: "Dracula",
          author: "Bram Stoker",
          summary:
            "A vampire lord named Count Dracula comes to England, bringing chaos and horror in his wake, as a group of people try to stop him.",
          quote: "I am Dracula, and I bid you welcome.",
        },
        {
          id: "4",
          title: "The Haunting of Hill House",
          author: "Shirley Jackson",
          summary:
            "Four people are invited to a haunted house, but only one of them experiences its terror to the fullest, unraveling the house’s dark secrets.",
          quote: "No live organism can continue for long to exist sanely under conditions of absolute reality.",
        },
        {
          id: "5",
          title: "The Exorcist",
          author: "William Peter Blatty",
          summary:
            "When a young girl is possessed by a mysterious force, her mother and a priest attempt to save her with an exorcism that becomes a battle of good versus evil.",
          quote: "The power of Christ compels you.",
        },
        {
          id: "6",
          title: "Bird Box",
          author: "Josh Malerman",
          summary:
            "In a post-apocalyptic world, an unseen force drives people to madness and suicide, and a mother and her children must navigate the dangerous world blindfolded.",
          quote: "If you hear the sound of a bird, you know it’s time to run.",
        },
        {
          id: "7",
          title: "The Silence of the Lambs",
          author: "Thomas Harris",
          summary:
            "A young FBI agent seeks the help of the infamous cannibalistic serial killer, Hannibal Lecter, to catch another serial killer on the loose.",
          quote: "I ate his liver with some fava beans and a nice chianti.",
        },
        {
          id: "8",
          title: "American Psycho",
          author: "Bret Easton Ellis",
          summary:
            "A wealthy and successful businessman leads a double life as a serial killer, making his everyday interactions both chilling and disturbing.",
          quote: "I am simply not there.",
        },
        {
          id: "9",
          title: "Carrie",
          author: "Stephen King",
          summary:
            "A shy, bullied high school girl with telekinetic powers unleashes her fury on her classmates during prom night after a cruel prank pushes her too far.",
          quote: "They're all going to laugh at you!",
        },
        {
          id: "10",
          title: "Pet Sematary",
          author: "Stephen King",
          summary:
            "A family moves to a rural home and discovers a cemetery where pets and even humans can be brought back to life, but with terrifying consequences.",
          quote: "Sometimes dead is better.",
        },
        {
          id: "11",
          title: "The Woman in Black",
          author: "Susan Hill",
          summary:
            "A lawyer travels to a small village to settle the estate of a deceased woman, only to encounter a vengeful ghost with a deadly grip on the village.",
          quote: "The Woman in Black is coming.",
        },
        {
          id: "12",
          title: "The Call of Cthulhu",
          author: "H.P. Lovecraft",
          summary:
            "An investigator discovers a secret cult worshiping an ancient cosmic entity, Cthulhu, and the horrifying consequences of awakening it.",
          quote: "That is not dead which can eternal lie, And with strange aeons even death may die.",
        },
        {
          id: "13",
          title: "Hell House",
          author: "Richard Matheson",
          summary:
            "A group of people investigate a haunted mansion known for its violent and terrifying history, but the evil within is far worse than they imagined.",
          quote: "Something in that house wants to destroy them all.",
        },
        {
          id: "14",
          title: "The Turn of the Screw",
          author: "Henry James",
          summary:
            "A governess becomes convinced that the two children she is caring for are being haunted by ghosts, but is she seeing spirits, or is she losing her mind?",
          quote: "I don’t believe in ghosts. But I do believe in the impossible.",
        },
        {
          id: "15",
          title: "House of Leaves",
          author: "Mark Z. Danielewski",
          summary:
            "A young man discovers a strange, haunted house that seems to shift its dimensions, leading him down a twisted path filled with horror, madness, and mystery.",
          quote: "This is not for you.",
        },
      ],
      
  }
  