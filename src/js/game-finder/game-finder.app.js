class GameFinderApp {
    constructor(apiPaths) {
      this.baseUrl = apiPaths.api;
      riot.observable(this);

      this.preferences = {};

      this.getGames();
      this.getPreferences();

      const steamUrl = Cookies.get(api.helpers.STEAM_URL_COOKIE_NAME);

      var conUrl = `ws://localhost:5000/ws?g=465ae476-bbf8-4b2b-9ff3-c7d19612163c=Test&u=${steamUrl}`;
      this.wsOpen(conUrl);

      riot.mount('game-finder-app', { app: this });
    }

    wsOpen(conUrl) {
      this.socket = null;
      this.socket = new WebSocket(conUrl);
  
      this.socket.onopen = (event) => {
        console.log('ON OPEN');
        console.log(event);
      };
      this.socket.onclose = (event) => {
        console.log('ON CLOSE');
        console.log(event);
      };

      this.socket.onerror = (event) => {
        console.log('ON ERROR');
        console.log(event);
      };
      this.socket.onmessage = (event) => {
        console.log('ON MESSAGE');
        console.log(event);
        alert('wan sum fuk');
      };

    }


    scoreGames() {
      for(let g = 0; g < this.games.length; g++) {
        let game = this.games[g];
        game.slScore = 0;


      }
    }

    likeCategory(category) {
      if (category.preference.localPreference === -1) {
        category.preference.localPreference = 1;
        category.preference.likes+=1;
        category.preference.dislikes-=1;
      } else if (category.preference.localPreference === 1) {
        category.preference.localPreference = 0;
        category.preference.likes-=1;
      } else if (category.preference.localPreference === 0) {
        category.preference.localPreference = 1;
        category.preference.likes+=1;
      }
    }

    dislikeCategory(category) {
      if (category.preference.localPreference === -1) {
        category.preference.localPreference = 0;
        category.preference.dislikes-=1;
      } else if (category.preference.localPreference === 1) {
        category.preference.localPreference = -1;
        category.preference.likes-=1;
        category.preference.dislikes+=1;
      } else if (category.preference.localPreference === 0) {
        category.preference.localPreference = -1;
        category.preference.dislikes+=1;
      }

      this.wsUpdatePreferences();
    }

    likeGenre(genre) {
      if (genre.preference.localPreference === -1) {
        genre.preference.localPreference = 1;
        genre.preference.likes+=1;
        genre.preference.dislikes-=1;
      } else if (genre.preference.localPreference === 1) {
        genre.preference.localPreference = 0;
        genre.preference.likes-=1;
      } else if (genre.preference.localPreference === 0) {
        genre.preference.localPreference = 1;
        genre.preference.likes+=1;
      }

      this.wsUpdatePreferences();
    }

    dislikeGenre(genre) {
      if (genre.preference.localPreference === -1) {
        genre.preference.localPreference = 0;
        genre.preference.dislikes-=1;
      } else if (genre.preference.localPreference === 1) {
        genre.preference.localPreference = -1;
        genre.preference.likes-=1;
        genre.preference.dislikes+=1;
      } else if (genre.preference.localPreference === 0) {
        genre.preference.localPreference = -1;
        genre.preference.dislikes+=1;
      }
    }

    wsUpdatePreferences() {
      if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
        console.log(this.socket);
        console.log('web socket is not open');
      }
      console.log(this.preferences);
      let msg = JSON.stringify({message:this.preferences});

      this.socket.send(msg);

    }

    getPreferences() {
      var categories = [];
      var genres = [];
      var platforms = [];

      for(let g = 0; g < this.games.length; g++) {
        const game = this.games[g];
        if (!game) continue;
        if (game.categories && game.categories.length > 0) {
          for(let c = 0; c < game.categories.length; c++) {
            const category = game.categories[c];
            if (!categories.some(x => x.id == category.id)) {
              categories.push({
                'id': category.id,
                'description': category.description,
                'count': 1,
                'preference': {
                  'likes': 0,
                  'dislikes': 0,
                  'localPreference': 0
                }
              });
            } else {
              var existing = categories.find(x => x.id == category.id);
              existing.count+=1;
            }
          }
        }

        if (game.genres && game.genres.length > 0) {
          for(let n = 0; n < game.genres.length; n++) {
            const genre = game.genres[n];
            if (!genres.some(x => x.id == genre.id)) {
              genres.push({
                'id': genre.id,
                'description': genre.description,
                'count': 1,
                'preference': {
                  'likes': 0,
                  'dislikes': 0,
                  'localPreference': 0
                }
              });
            } else {
              var existing = genres.find(x => x.id == genre.id);
              existing.count+=1;
            }
          }
        }
      }

      this.preferences['categories'] = categories;
      this.preferences['genres'] = genres;
    }


    getGames() {
      this.games = [
        {
          "type": "game",
          "name": "Half-Life 2",
          "steam_appid": 220,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "1998. HALF-LIFE sends a shock through the game industry with its combination of pounding action and continuous, immersive storytelling. Valve's debut title wins more than 50 game-of-the-year awards on its way to being named \"Best PC Game Ever\" by PC Gamer, and launches a franchise with more than eight million retail units sold worldwide.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, German<strong>*</strong>, Italian<strong>*</strong>, Korean<strong>*</strong>, Spanish - Spain<strong>*</strong>, Russian<strong>*</strong>, Simplified Chinese, Traditional Chinese, Dutch, Danish, Finnish, Japanese, Norwegian, Polish, Portuguese, Swedish, Thai<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/220/header.jpg?t=1533329234",
          "website": "http://www.half-life2.com",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 999,
            "discount_percent": 0
          },
          "packages": [
            36,
            289444,
            469
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 96,
            "url": "https://www.metacritic.com/game/pc/half-life-2?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 13,
              "description": "Captions available"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 16,
              "description": "Includes Source SDK"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 45900
          },
          "release_date": {
            "coming_soon": false,
            "date": "Nov 16, 2004"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/220/page_bg_generated_v6b.jpg?t=1533329234",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Garry's Mod",
          "steam_appid": 4000,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Garry's Mod is a physics sandbox. There aren't any predefined aims or goals. We give you the tools and leave you to play.",
          "supported_languages": "English<strong>*</strong>, French, Italian, German, Spanish - Spain, Bulgarian, Czech, Danish, Dutch, Finnish, Greek, Hungarian, Japanese, Korean, Norwegian, Polish, Portuguese, Portuguese - Brazil, Russian, Simplified Chinese, Swedish, Thai, Traditional Chinese, Turkish, Ukrainian<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/4000/header.jpg?t=1535986052",
          "website": "http://gmod.facepunch.com",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 499,
            "discount_percent": 50
          },
          "packages": [
            218,
            295508
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": null,
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 27,
              "description": "Cross-Platform Multiplayer"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 13,
              "description": "Captions available"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 8,
              "description": "Valve Anti-Cheat enabled"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            }
          ],
          "genres": [
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 28,
              "description": "Simulation"
            }
          ],
          "recommendations": {
            "total": 285385
          },
          "release_date": {
            "coming_soon": false,
            "date": "Nov 29, 2006"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/4000/page_bg_generated_v6b.jpg?t=1535986052",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Half-Life 2: Lost Coast",
          "steam_appid": 340,
          "required_age": 0,
          "is_free": true,
          "controller_support": null,
          "short_description": "Originally planned as a section of the Highway 17 chapter of Half-Life 2, Lost Coast is a playable technology showcase that introduces High Dynamic Range lighting to the Source engine.",
          "supported_languages": "English, French, German, Italian, Spanish - Spain, Russian, Simplified Chinese, Traditional Chinese, Korean",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/340/header.jpg?t=1530046348",
          "website": "http://www.half-life2.com",
          "price_overview": null,
          "packages": null,
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": null,
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 14,
              "description": "Commentary available"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 4517
          },
          "release_date": {
            "coming_soon": false,
            "date": "Oct 27, 2005"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/340/page_bg_generated_v6b.jpg?t=1530046348",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Uplink",
          "steam_appid": 1510,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "You play an Uplink Agent who makes a living by performing jobs for major corporations. Your tasks involve hacking into rival computer systems, stealing research data, sabotaging other companies, laundering money, erasing evidence, or framing innocent people.",
          "supported_languages": "English",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/1510/header.jpg?t=1478098895",
          "website": "http://www.uplink.co.uk/",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 249,
            "discount_percent": 75
          },
          "packages": [
            112,
            14002
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 75,
            "url": "https://www.metacritic.com/game/pc/uplink-hacker-elite?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            }
          ],
          "genres": [
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 1174
          },
          "release_date": {
            "coming_soon": false,
            "date": "Aug 23, 2006"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/1510/page_bg_generated_v6b.jpg?t=1478098895",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Darwinia",
          "steam_appid": 1500,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Combining fast-paced action with strategic battle planning, Darwinia features a novel and intuitive control mechanism, a graphical style ripped from 80's retro classics like Tron and Defender, and a story concerning a tribe of nomadic sprites trapped in a modern 3D world.",
          "supported_languages": "English, German",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/1500/header.jpg?t=1460468361",
          "website": "http://www.darwinia.co.uk/",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 249,
            "discount_percent": 75
          },
          "packages": [
            54,
            14324,
            978,
            14002
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 84,
            "url": "https://www.metacritic.com/game/pc/darwinia?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            }
          ],
          "genres": [
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 396
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jul 14, 2005"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/1500/page_bg_generated_v6b.jpg?t=1460468361",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Counter-Strike: Source",
          "steam_appid": 240,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Just updated to include player stats, achievements, new scoreboards and more!",
          "supported_languages": "English, French, German, Italian, Japanese, Korean, Spanish - Spain, Russian, Simplified Chinese, Traditional Chinese, Thai, Turkish",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/240/header.jpg?t=1515613564",
          "website": null,
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 999,
            "discount_percent": 0
          },
          "packages": [
            37
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 88,
            "url": "https://www.metacritic.com/game/pc/counter-strike-source?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 27,
              "description": "Cross-Platform Multiplayer"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 8,
              "description": "Valve Anti-Cheat enabled"
            },
            {
              "id": 15,
              "description": "Stats"
            },
            {
              "id": 16,
              "description": "Includes Source SDK"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 41383
          },
          "release_date": {
            "coming_soon": false,
            "date": "Nov 1, 2004"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/240/page_bg_generated_v6b.jpg?t=1515613564",
          "content_descriptors": {
            "ids": [
              2,
              5
            ],
            "notes": "Includes intense violence and blood."
          }
        },
        {
          "type": "advertising",
          "name": "Tom Clancy's Ghost Recon Advanced Warfighter® 2",
          "steam_appid": 13510,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Ubisoft's award-winning shooter that was founded on the PC returns with Tom Clancy's Ghost Recon Advanced Warfighter® 2, designed specifically for the PC gamer by GRIN. Building on the foundation of Ghost Recon Advanced Warfighter, the sequel is a near-future warfare masterpiece.",
          "supported_languages": "English, French, Spanish - Spain, Italian, German",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/13510/header.jpg?t=1447351264",
          "website": "http://www.ghostrecon.com/uk/ghostrecon3/index.php",
          "price_overview": null,
          "packages": null,
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 76,
            "url": "https://www.metacritic.com/game/pc/tom-clancys-ghost-recon-advanced-warfighter-2?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 124
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jul 15, 2008"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/13510/page_bg_generated_v6b.jpg?t=1447351264",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Half-Life 2: Episode Two",
          "steam_appid": 420,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Half-Life&reg; 2: Episode Two is the second in a trilogy of new games created by Valve that extends the award-winning and best-selling Half-Life&reg; adventure. As Dr. Gordon Freeman, you were last seen exiting City 17 with Alyx Vance as the Citadel erupted amidst a storm of unknown proportions.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, German<strong>*</strong>, Russian<strong>*</strong>, Danish, Dutch, Finnish, Italian, Japanese, Korean, Norwegian, Polish, Portuguese, Simplified Chinese, Spanish - Spain<strong>*</strong>, Swedish, Traditional Chinese<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/420/header.jpg?t=1530046627",
          "website": "http://www.whatistheorangebox.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 799,
            "final": 799,
            "discount_percent": 0
          },
          "packages": [
            516,
            469
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 90,
            "url": "https://www.metacritic.com/game/pc/half-life-2-episode-two?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 13,
              "description": "Captions available"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 15,
              "description": "Stats"
            },
            {
              "id": 16,
              "description": "Includes Source SDK"
            },
            {
              "id": 14,
              "description": "Commentary available"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 9889
          },
          "release_date": {
            "coming_soon": false,
            "date": "Oct 10, 2007"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/420/page_bg_generated_v6b.jpg?t=1530046627",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Tom Clancy's Ghost Recon® Desert Siege™",
          "steam_appid": 13620,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "East Africa, 2009. A 60-year conflict boils over as Ethiopia invades its smaller neighbor Eritrea, threatening the world's most vital shipping lanes in the Red Sea. An elite team of U.S. Army Green Berets, known as the Ghosts, moves in to safeguard the seas and free Eritrea.",
          "supported_languages": "English",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/13620/header.jpg?t=1447351282",
          "website": "http://www.ghostrecon.com/us/product_grds.php",
          "price_overview": {
            "currency": "USD",
            "initial": 499,
            "final": 499,
            "discount_percent": 0
          },
          "packages": [
            861
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 82,
            "url": "https://www.metacritic.com/game/pc/tom-clancys-ghost-recon-desert-siege?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": null,
          "release_date": {
            "coming_soon": false,
            "date": "Jul 15, 2008"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/13620/page_bg_generated_v6b.jpg?t=1447351282",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "AudioSurf",
          "steam_appid": 12900,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Ride your music. Audiosurf is a music-adapting puzzle racer where you use your own music to create your own experience. The shape, the speed, and the mood of each ride is determined by the song you choose.",
          "supported_languages": "English, Russian",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/12900/header.jpg?t=1478101211",
          "website": "http://www.audio-surf.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 249,
            "discount_percent": 75
          },
          "packages": [
            636
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 85,
            "url": "https://www.metacritic.com/game/pc/audiosurf?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            }
          ],
          "genres": [
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": {
            "total": 7318
          },
          "release_date": {
            "coming_soon": false,
            "date": "Feb 15, 2008"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/12900/page_bg_generated_v6b.jpg?t=1478101211",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Half-Life 2: Deathmatch",
          "steam_appid": 320,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Fast multiplayer action set in the Half-Life 2 universe! HL2's physics adds a new dimension to deathmatch play. Play straight deathmatch or try Combine vs. Resistance teamplay. Toss a toilet at your friend today!",
          "supported_languages": "English",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/320/header.jpg?t=1512752170",
          "website": null,
          "price_overview": {
            "currency": "USD",
            "initial": 499,
            "final": 499,
            "discount_percent": 0
          },
          "packages": [
            39,
            79
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": null,
          "categories": [
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 8,
              "description": "Valve Anti-Cheat enabled"
            },
            {
              "id": 16,
              "description": "Includes Source SDK"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 3839
          },
          "release_date": {
            "coming_soon": false,
            "date": "Nov 1, 2004"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/320/page_bg_generated_v6b.jpg?t=1512752170",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Tom Clancy's Ghost Recon® Island Thunder™",
          "steam_appid": 13630,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Ghost Recon takes the next step in battlefield realism with Tom Clancy's Ghost Recon&trade;: Island Thunder&trade;. Cuba, 2009: Castro is dead, and the first free Cuban elections in decades are thrown into turmoil by a drug-funded warlord. The Ghosts, an elite team of U.S.",
          "supported_languages": "English",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/13630/header.jpg?t=1447351283",
          "website": "http://www.ghostrecon.com/us/product_grit.php",
          "price_overview": {
            "currency": "USD",
            "initial": 499,
            "final": 499,
            "discount_percent": 0
          },
          "packages": [
            860
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 82,
            "url": "https://www.metacritic.com/game/pc/tom-clancys-ghost-recon-island-thunder?ftag=MCD-06-10aaa1f"
          },
          "categories": null,
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": null,
          "release_date": {
            "coming_soon": false,
            "date": "Jul 15, 2008"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/13630/page_bg_generated_v6b.jpg?t=1447351283",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Tom Clancy's Ghost Recon®",
          "steam_appid": 15300,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "Eastern Europe, 2008. War has broken out on the borders of Russia and the fate of the world hangs in the balance. That's when the call goes out for the Ghostsan elite handful of specially trained Green Berets, armed with the latest technology and trained to use the deadliest weapons.",
          "supported_languages": "English",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/15300/header.jpg?t=1447351361",
          "website": "http://ghostrecon.us.ubi.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 999,
            "discount_percent": 0
          },
          "packages": [
            859
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 80,
            "url": "https://www.metacritic.com/game/pc/tom-clancys-ghost-recon?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 505
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jul 15, 2008"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/15300/page_bg_generated_v6b.jpg?t=1447351361",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "advertising",
          "name": "Tom Clancy's Ghost Recon Advanced Warfighter®",
          "steam_appid": 13640,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Combining the advantages of next-generation console technology with future military technologies, Tom Clancy's Ghost Recon Advanced Warfighter® includes many groundbreaking features, including the Cross-Com, a communication device powered by satellite technology, which delivers complete battlefield awareness in the chaos of the Urban warf",
          "supported_languages": "English, French, Spanish - Spain, Italian, German",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/13640/header.jpg?t=1447351266",
          "website": "http://www.ghostrecon.com/us/ghostrecon3/index.php",
          "price_overview": null,
          "packages": null,
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 80,
            "url": "https://www.metacritic.com/game/pc/tom-clancys-ghost-recon-advanced-warfighter?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": null,
          "release_date": {
            "coming_soon": false,
            "date": "Jul 15, 2008"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/13640/page_bg_generated_v6b.jpg?t=1447351266",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Multiwinia",
          "steam_appid": 1530,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "&quot;Long ago a computer scientist called Dr Sepulveda created a beautiful digital world existing entirely within a computer network of his own invention. This world was called Darwinia and it was inhabited by a peaceful, law-abiding digital life-form called the Darwinians.",
          "supported_languages": "English, French, Italian, German, Spanish - Spain",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/1530/header.jpg?t=1478098656",
          "website": "http://www.introversion.co.uk/multiwinia/",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 249,
            "discount_percent": 75
          },
          "packages": [
            1002,
            978,
            14002
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": false
          },
          "metacritic": {
            "score": 76,
            "url": "https://www.metacritic.com/game/pc/multiwinia-survival-of-the-flattest?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            }
          ],
          "genres": [
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": {
            "total": 286
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 19, 2008"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/1530/page_bg_generated_v6b.jpg?t=1478098656",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "The Witcher: Enhanced Edition Director's Cut",
          "steam_appid": 20900,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Become The Witcher, Geralt of Rivia, a legendary monster slayer caught in a web of intrigue woven by forces vying for control of the world. Make difficult decisions and live with the consequences in an game that will immerse you in an extraordinary tale like no other.",
          "supported_languages": "English, French, German, Spanish - Spain, Italian, Czech, Russian, Hungarian, Polish, Traditional Chinese (text only)",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/20900/header.jpg?t=1540479246",
          "website": "http://www.thewitcher.com",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 149,
            "discount_percent": 85
          },
          "packages": [
            994,
            303247
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": false
          },
          "metacritic": {
            "score": 86,
            "url": "https://www.metacritic.com/game/pc/the-witcher-enhanced-edition?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 25446
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 19, 2008"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/20900/page_bg_generated_v6b.jpg?t=1540479246",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Tom Clancy's Rainbow Six® Vegas",
          "steam_appid": 13540,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "Tom Clancy's Rainbow Six makes its next-generation hardware debut in the most dramatic installment of the renowned first-person shooter franchise to date. Rainbow operatives take to the chaotic streets of Las Vegas as an escalating terrorist siege in 'Sin City' threatens to take world terrorism to new, uncontrollable heights.",
          "supported_languages": "English, French",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/13540/header.jpg?t=1447351261",
          "website": "http://rainbowsixgame.uk.ubi.com/vegas/",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 999,
            "discount_percent": 0
          },
          "packages": [
            701
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 85,
            "url": "http://www.metacritic.com/game/pc/tom-clancys-rainbow-six-vegas"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 391
          },
          "release_date": {
            "coming_soon": false,
            "date": "Apr 9, 2008"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/13540/page_bg_generated_v6b.jpg?t=1447351261",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Tom Clancy's Rainbow Six Lockdown™",
          "steam_appid": 15000,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "Engineered specifically for the PC by Red Storm Entertainment, Rainbow Six returns to deliver the tensest close-quarters battles ever experienced online. In this episode, Rainbow faces independent terrorist threats, tied together by one common element - the Legion virus.",
          "supported_languages": "English",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/15000/header.jpg?t=1447351287",
          "website": null,
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 999,
            "discount_percent": 0
          },
          "packages": [
            732
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 59,
            "url": "https://www.metacritic.com/game/pc/tom-clancys-rainbow-six-lockdown?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 135
          },
          "release_date": {
            "coming_soon": false,
            "date": "May 13, 2008"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/15000/page_bg_generated_v6b.jpg?t=1447351287",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Tom Clancy's Rainbow Six® Vegas 2",
          "steam_appid": 15120,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "Tom Clancy's Rainbow Six® Vegas 2 - the sequel to the award-winning next-generation first-person shooter - returns to Sin City. Tom Clancy's Rainbow Six Vegas 2 is your last chance to rescue America's sexiest city from an escalating terrorist siege that will force you into heart-pounding action from beginning to end.",
          "supported_languages": "English, French, Italian, German, Spanish - Spain",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/15120/header.jpg?t=1504805365",
          "website": "http://rainbowsixgame.us.ubi.com/home.php",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 999,
            "discount_percent": 0
          },
          "packages": [
            702
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 78,
            "url": "http://www.metacritic.com/game/pc/tom-clancys-rainbow-six-vegas-2"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 2474
          },
          "release_date": {
            "coming_soon": false,
            "date": "Apr 16, 2008"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/15120/page_bg_generated_v6b.jpg?t=1504805365",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Tom Clancy's Rainbow Six® 3 Gold",
          "steam_appid": 19830,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Raven Shield:Command an elite multinational squad of special operatives against hidden terrorist forces. In Tom Clancy's Rainbow Six 3: Raven Shield, the third installment to the wildly popular Rainbow Six series, Team Rainbow faces the hidden global forces of a new and secretive foe.",
          "supported_languages": "English",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/19830/header.jpg?t=1472142064",
          "website": null,
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 999,
            "discount_percent": 0
          },
          "packages": [
            1013
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 85,
            "url": "https://www.metacritic.com/game/pc/tom-clancys-rainbow-six?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 746
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 25, 2008"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/19830/page_bg_generated_v6b.jpg?t=1472142064",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        null,
        {
          "type": "game",
          "name": "Dead Space",
          "steam_appid": 17470,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Only the Dead Survive. A massive deep-space mining ship goes dark after unearthing a strange artifact on a distant planet. Engineer Isaac Clarke embarks on the repair mission, only to uncover a nightmarish blood bath  the ship's crew horribly slaughtered and infected by alien scourge.",
          "supported_languages": "English, French, German, Italian, Spanish - Spain",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/17470/header.jpg?t=1511287106",
          "website": "http://deadspace.ea.com/agegate.aspx?returnURL=/Default.aspx",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 499,
            "discount_percent": 75
          },
          "packages": [
            1290
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 86,
            "url": "https://www.metacritic.com/game/pc/dead-space?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 28,
              "description": "Full controller support"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 6746
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jan 9, 2009"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/17470/page_bg_generated_v6b.jpg?t=1511287106",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Mount & Blade",
          "steam_appid": 22100,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Calradia is a land at war, offering great riches and even greater dangers to adventurers and mercenaries that flock to shed their blood on its soil. With courage and a strong sword, an unknown stranger can make a name as a warrior. Free-form sand-box gameplay.",
          "supported_languages": "English, German, Polish, Simplified Chinese, Traditional Chinese, Czech",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/22100/header.jpg?t=1511533242",
          "website": "http://www.taleworlds.com/en/Games/MountAndBlade",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 399,
            "discount_percent": 60
          },
          "packages": [
            38001,
            50292
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 72,
            "url": "https://www.metacritic.com/game/pc/mount-blade?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            }
          ],
          "genres": [
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 2630
          },
          "release_date": {
            "coming_soon": false,
            "date": "Nov 3, 2008"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/22100/page_bg_generated_v6b.jpg?t=1511533242",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Burnout Paradise: The Ultimate Box",
          "steam_appid": 24740,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Download Burnout™ Paradise: The Ultimate Box today. Paradise City is the largest and most dangerous setting yet for the best-selling Burnout series. The massive setting gives players an open-ended world to explore, as they race their vehicles through hundreds of miles of roads and underground passages with more than 70 different cars.",
          "supported_languages": "English",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/24740/header.jpg?t=1450909984",
          "website": "http://www.criteriongames.com/intro.php",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1999,
            "discount_percent": 0
          },
          "packages": [
            1465
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 87,
            "url": "https://www.metacritic.com/game/pc/burnout-paradise-the-ultimate-box?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            }
          ],
          "genres": [
            {
              "id": 9,
              "description": "Racing"
            }
          ],
          "recommendations": {
            "total": 6762
          },
          "release_date": {
            "coming_soon": false,
            "date": "Mar 12, 2009"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/24740/page_bg_generated_v6b.jpg?t=1450909984",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Killing Floor",
          "steam_appid": 1250,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "6-player co-op survival horror at its finest! Free updates, free special events and a ridiculous amount of fun!",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, Italian<strong>*</strong>, German<strong>*</strong>, Spanish - Spain<strong>*</strong>, Hungarian, Polish, Russian<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/1250/header.jpg?t=1529340864",
          "website": "http://www.killingfloorthegame.com",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 499,
            "discount_percent": 75
          },
          "packages": [
            1579
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 72,
            "url": "https://www.metacritic.com/game/pc/killing-floor?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 27,
              "description": "Cross-Platform Multiplayer"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 8,
              "description": "Valve Anti-Cheat enabled"
            },
            {
              "id": 15,
              "description": "Stats"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 31059
          },
          "release_date": {
            "coming_soon": false,
            "date": "May 14, 2009"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/1250/page_bg_generated_v6b.jpg?t=1529340864",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Star Wars: Battlefront 2 (Classic, 2005)",
          "steam_appid": 6060,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Join the rise of Darth Vader’s elite 501st Legion of Stormtroopers as you fight through an all new story-based saga where every action you take impacts the battlefront and, ultimately, the fate of the Star Wars galaxy.",
          "supported_languages": "English<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/6060/header.jpg?t=1524018481",
          "website": "http://www.swbattlefront2.com",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 999,
            "discount_percent": 0
          },
          "packages": [
            1787
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 78,
            "url": "https://www.metacritic.com/game/pc/star-wars-battlefront-ii?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 36,
              "description": "Online Multi-Player"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 25943
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jul 8, 2009"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/6060/page_bg_generated_v6b.jpg?t=1524018481",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "mod",
          "name": "Defence Alliance 2",
          "steam_appid": 35420,
          "required_age": 0,
          "is_free": true,
          "controller_support": null,
          "short_description": "Defence Alliance 2 is a total conversion mod for Killing Floor featuring team based futuristic FPS game play. DA2 blends fast paced action with class based tactics to create an experience that is instantly enjoyable while still offering very deep gameplay.",
          "supported_languages": "English",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/35420/header.jpg?t=1447352644",
          "website": "http://www.defencealliancegame.com",
          "price_overview": null,
          "packages": null,
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": null,
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 19,
              "description": "Mods"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 416
          },
          "release_date": {
            "coming_soon": false,
            "date": "Dec 11, 2009"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/35420/page_bg_generated_v6b.jpg?t=1447352644",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "STAR WARS™ Jedi Knight - Jedi Academy™",
          "steam_appid": 6020,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Forge your weapon and follow the path of the Jedi Jedi Knight: Jedi Academy is the latest installment of the highly acclaimed Jedi Knight series. Take on the role of a new student eager to learn the ways of the Force from Jedi Master Luke Skywalker.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, German<strong>*</strong>, Spanish - Spain<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/6020/header.jpg?t=1489550565",
          "website": "http://www.lucasarts.com",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 999,
            "discount_percent": 0
          },
          "packages": [
            2117
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": false
          },
          "metacritic": {
            "score": 81,
            "url": "https://www.metacritic.com/game/pc/star-wars-jedi-knight-jedi-academy?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 36,
              "description": "Online Multi-Player"
            },
            {
              "id": 37,
              "description": "Local Multi-Player"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 4688
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 16, 2009"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/6020/page_bg_generated_v6b.jpg?t=1489550565",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "STAR WARS™ Jedi Knight II - Jedi Outcast™",
          "steam_appid": 6030,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "The Legacy of Star Wars Dark Forces™ and Star Wars® Jedi Knight lives on in the intense first-person action of Jedi Outcast.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, German<strong>*</strong>, Spanish - Spain, Traditional Chinese<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/6030/header.jpg?t=1489458409",
          "website": "http://www.lucasarts.com",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 999,
            "discount_percent": 0
          },
          "packages": [
            2116
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": false
          },
          "metacritic": {
            "score": 89,
            "url": "https://www.metacritic.com/game/pc/star-wars-jedi-knight-ii-jedi-outcast?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 36,
              "description": "Online Multi-Player"
            },
            {
              "id": 37,
              "description": "Local Multi-Player"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 1782
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 16, 2009"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/6030/page_bg_generated_v6b.jpg?t=1489458409",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "STAR WARS™ Jedi Knight: Dark Forces II",
          "steam_appid": 32380,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Jedi Knight: Dark Forces II picks up where the award-winning Dark Forces™ game left off...with even more features and firepower in dazzling 3D graphics. As Kyle Katarn, you must acquire a lightsaber and learn the ways of the Force to become a Jedi Knight.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, Italian<strong>*</strong>, Spanish - Spain<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/32380/header.jpg?t=1498859353",
          "website": "http://www.lucasarts.com",
          "price_overview": {
            "currency": "USD",
            "initial": 599,
            "final": 599,
            "discount_percent": 0
          },
          "packages": [
            2114
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 91,
            "url": "https://www.metacritic.com/game/pc/star-wars-jedi-knight-dark-forces-ii?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 37,
              "description": "Local Multi-Player"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 841
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 16, 2009"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/32380/page_bg_generated_v6b.jpg?t=1498859353",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "STAR WARS™ Jedi Knight - Mysteries of the Sith™",
          "steam_appid": 32390,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "It is five years after Kyle's victory over the seven dark Jedi. Invading Imperial forces advance upon a quiet Rebel outpost, interrupting Kyle's training of a brave new Jedi, Mara Jade. First introduced in Timothy Zahn's award-winning Star Wars novel, Heir to the Empire, Mara Jade blends her past experiences as a one time smuggler and...",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, Italian<strong>*</strong>, Spanish - Spain<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/32390/header.jpg?t=1498859456",
          "website": "http://www.lucasarts.com",
          "price_overview": {
            "currency": "USD",
            "initial": 299,
            "final": 299,
            "discount_percent": 0
          },
          "packages": [
            2115
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": null,
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 471
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 16, 2009"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/32390/page_bg_generated_v6b.jpg?t=1498859456",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "STAR WARS™ - Dark Forces",
          "steam_appid": 32400,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Behind a veil of secrecy the evil Empire is creating a doomsday army - one that, if finished, will become the final cog in the Empire's arsenal of terror and domination. Your Mission? Join the Rebel Alliance's covert operations division, infiltrate the Empire.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, German<strong>*</strong>, Italian<strong>*</strong>, Spanish - Spain<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/32400/header.jpg?t=1521502339",
          "website": "http://www.lucasarts.com",
          "price_overview": {
            "currency": "USD",
            "initial": 599,
            "final": 599,
            "discount_percent": 0
          },
          "packages": [
            2113
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": false
          },
          "metacritic": null,
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 1240
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 16, 2009"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/32400/page_bg_generated_v6b.jpg?t=1521502339",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Red Faction Guerrilla Re-Mars-tered",
          "steam_appid": 667720,
          "required_age": 17,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Red Faction: Guerrilla re-defines the limits of destruction-based game-play with a huge open-world, fast-paced guerrilla-style combat, and true physics-based destruction.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, Italian<strong>*</strong>, German<strong>*</strong>, Spanish - Spain<strong>*</strong>, Arabic, Simplified Chinese, Japanese, Polish, Russian<strong>*</strong>, Czech<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/667720/header.jpg?t=1533041495",
          "website": null,
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1999,
            "discount_percent": 0
          },
          "packages": [
            189796,
            15630,
            123985
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": null,
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 36,
              "description": "Online Multi-Player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            }
          ],
          "genres": [
            {
              "id": 74,
              "description": "Gore"
            }
          ],
          "recommendations": {
            "total": 852
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jul 3, 2018"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/667720/page_bg_generated_v6b.jpg?t=1533041495",
          "content_descriptors": {
            "ids": [
              2,
              5
            ],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Command & Conquer: Red Alert 3 - Uprising",
          "steam_appid": 24800,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Red Alert 3: Uprising features four new mini-campaigns, giving players a deeper dive into the storyline's of the Soviets, the Allies, the Empire of the Rising Sun and a unique campaign centered on the origins of everyone’s favorite psionic Japanese schoolgirl commando, Yuriko Omega.",
          "supported_languages": "English, Czech, French, German, Hungarian, Italian, Polish, Russian, Spanish - Spain",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/24800/header.jpg?t=1447352543",
          "website": null,
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1999,
            "discount_percent": 0
          },
          "packages": [
            2208
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": null,
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            }
          ],
          "genres": [
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 869
          },
          "release_date": {
            "coming_soon": false,
            "date": "Oct 6, 2009"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/24800/page_bg_generated_v6b.jpg?t=1447352543",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Tropico 3",
          "steam_appid": 23490,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Become the dictator of a remote island during the Cold War. Charm, persuade, intimidate, oppress, or cheat your people to stay in power! Are you a kind and generous leader? A corrupt and ruthless tyrant ruling with an iron fist?",
          "supported_languages": "English, French, German, Italian, Spanish - Spain",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/23490/header.jpg?t=1540579243",
          "website": "http://www.worldoftropico.com",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 999,
            "discount_percent": 0
          },
          "packages": [
            2128,
            6253,
            12169
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 79,
            "url": "https://www.metacritic.com/game/pc/tropico-3?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            }
          ],
          "genres": [
            {
              "id": 28,
              "description": "Simulation"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 582
          },
          "release_date": {
            "coming_soon": false,
            "date": "Oct 20, 2009"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/23490/page_bg_generated_v6b.jpg?t=1540579243",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Red Faction Guerrilla Steam Edition",
          "steam_appid": 20500,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Set 50 years after the climactic events of the original Red Faction, Red Faction: Guerrilla allows players to take the role of an insurgent fighter with the newly re-established Red Faction movement as they battle for liberation from the oppressive Earth Defense Force.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, German<strong>*</strong>, Italian<strong>*</strong>, Spanish - Spain<strong>*</strong>, Czech, Polish, Russian<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/20500/header.jpg?t=1533041577",
          "website": "http://www.redfaction.com",
          "price_overview": null,
          "packages": [
            189796,
            15630,
            123985
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 82,
            "url": "https://www.metacritic.com/game/pc/red-faction-guerrilla?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 5644
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 15, 2009"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/20500/page_bg_generated_v6b.jpg?t=1533041577",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Gumboy - Crazy Adventures™",
          "steam_appid": 2520,
          "required_age": 0,
          "is_free": true,
          "controller_support": null,
          "short_description": "Gumboy has fun and novel gameplay set in a richly imagined world. With simple game controls, Gumboy lets the player bounce, roll, float, and fly through the world. Additionally, Gumboy can change size, shape and material.",
          "supported_languages": "English, Polish, Russian",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/2520/header.jpg?t=1529320674",
          "website": "http://www.gumboycrazyadventures.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 499,
            "final": 124,
            "discount_percent": 75
          },
          "packages": [
            234
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 69,
            "url": "https://www.metacritic.com/game/pc/gumboy-crazy-adventures?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            }
          ],
          "genres": [
            {
              "id": 4,
              "description": "Casual"
            },
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": null,
          "release_date": {
            "coming_soon": false,
            "date": "Dec 19, 2006"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/2520/page_bg_generated_v6b.jpg?t=1529320674",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Gumboy - Crazy Adventures™",
          "steam_appid": 2520,
          "required_age": 0,
          "is_free": true,
          "controller_support": null,
          "short_description": "Gumboy has fun and novel gameplay set in a richly imagined world. With simple game controls, Gumboy lets the player bounce, roll, float, and fly through the world. Additionally, Gumboy can change size, shape and material.",
          "supported_languages": "English, Polish, Russian",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/2520/header.jpg?t=1529320674",
          "website": "http://www.gumboycrazyadventures.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 499,
            "final": 124,
            "discount_percent": 75
          },
          "packages": [
            234
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 69,
            "url": "https://www.metacritic.com/game/pc/gumboy-crazy-adventures?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            }
          ],
          "genres": [
            {
              "id": 4,
              "description": "Casual"
            },
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": null,
          "release_date": {
            "coming_soon": false,
            "date": "Dec 19, 2006"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/2520/page_bg_generated_v6b.jpg?t=1529320674",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Vigil: Blood Bitterness™",
          "steam_appid": 2570,
          "required_age": 0,
          "is_free": true,
          "controller_support": null,
          "short_description": "Vigil: Blood Bitterness plunges you into the dark and disturbing story of an ancient civilization where you must reveal the secrets of your past and exact revenge on the Evil destroying your universe. Ritualistic killings and blood lust blur the line between your own kind and the Evil you seek to annihilate.",
          "supported_languages": "English",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/2570/header.jpg?t=1472555208",
          "website": null,
          "price_overview": null,
          "packages": null,
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 61,
            "url": "https://www.metacritic.com/game/pc/vigil-blood-bitterness?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            }
          ],
          "genres": [
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 104
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jun 29, 2007"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/2570/page_bg_generated_v6b.jpg?t=1472555208",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Obulis",
          "steam_appid": 11330,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Obulis can literally be learned in seconds, but the puzzles will keep you thinking for hours.",
          "supported_languages": "English",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/11330/header.jpg?t=1511314799",
          "website": null,
          "price_overview": {
            "currency": "USD",
            "initial": 499,
            "final": 99,
            "discount_percent": 80
          },
          "packages": [
            1494
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": null,
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            }
          ],
          "genres": [
            {
              "id": 4,
              "description": "Casual"
            },
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": {
            "total": 480
          },
          "release_date": {
            "coming_soon": false,
            "date": "Mar 19, 2009"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/11330/page_bg_generated_v6b.jpg?t=1511314799",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Chains",
          "steam_appid": 11360,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Chains is a challenging puzzle game with a unique feel and distinctive vector graphics style. The object of the game is simple - to link adjacent bubbles of the same color into chains. As you progress through the physics-driven stages it becomes increasingly more challenging and players' speed, strategy and skill will be put to the test.",
          "supported_languages": "English,German,Spanish - Spain,#lang_français",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/11360/header.jpg?t=1479728118",
          "website": "http://www.2dengine.com/chains/",
          "price_overview": {
            "currency": "USD",
            "initial": 499,
            "final": 99,
            "discount_percent": 80
          },
          "packages": [
            1773
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": false
          },
          "metacritic": null,
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            }
          ],
          "genres": [
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": {
            "total": 388
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jul 1, 2009"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/11360/page_bg_generated_v6b.jpg?t=1479728118",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Mount & Blade: Warband",
          "steam_appid": 48700,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "In a land torn asunder by incessant warfare, it is time to assemble your own band of hardened warriors and enter the fray. Lead your men into battle, expand your realm, and claim the ultimate prize: the throne of Calradia!",
          "supported_languages": "English, Czech, French, German, Hungarian, Polish, Simplified Chinese, Traditional Chinese, Spanish - Spain, Japanese, Turkish",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/48700/header.jpg?t=1511540397",
          "website": "http://www.taleworlds.com/en/Games/Warband",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 799,
            "discount_percent": 60
          },
          "packages": [
            38004,
            50293,
            50292
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 78,
            "url": "https://www.metacritic.com/game/pc/mount-blade-warband?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 53786
          },
          "release_date": {
            "coming_soon": false,
            "date": "Mar 31, 2010"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/48700/page_bg_generated_v6b.jpg?t=1511540397",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        null,
        {
          "type": "game",
          "name": "S.T.A.L.K.E.R.: Call of Pripyat",
          "steam_appid": 41700,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "S.T.A.L.K.E.R.: Call of Pripyat is the direst sequel of the S.T.A.L.K.E.R.: Shadow of Chernobyl. As a Major Alexander Degtyarev you should investigate the crash of the governmental helicopters around the Zone and find out, what happened there.",
          "supported_languages": "German<strong>*</strong>, English<strong>*</strong>, French<strong>*</strong>, Italian<strong>*</strong>, Russian<strong>*</strong>, Spanish - Spain<strong>*</strong>, Ukrainian<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/41700/header.jpg?t=1540831191",
          "website": "http://cop.stalker-game.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 599,
            "discount_percent": 70
          },
          "packages": [
            2884,
            35983
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 80,
            "url": "https://www.metacritic.com/game/pc/stalker-call-of-pripyat?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 7469
          },
          "release_date": {
            "coming_soon": false,
            "date": "Feb 11, 2010"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/41700/page_bg_generated_v6b.jpg?t=1540831191",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Aliens vs. Predator™",
          "steam_appid": 10680,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "Survive, hunt and prey in the deadly jungles and swamps in distinctly new and thrilling first person gameplay.",
          "supported_languages": "English, French, German, Italian, Russian, Spanish - Spain",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/10680/header.jpg?t=1532338834",
          "website": "http://www.sega.com/avp",
          "price_overview": {
            "currency": "USD",
            "initial": 1499,
            "final": 1499,
            "discount_percent": 0
          },
          "packages": [
            2967,
            27828
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 68,
            "url": "https://www.metacritic.com/game/pc/aliens-vs-predator?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 15,
              "description": "Stats"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 6761
          },
          "release_date": {
            "coming_soon": false,
            "date": "Feb 16, 2010"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/10680/page_bg_generated_v6b.jpg?t=1532338834",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Just Cause 2",
          "steam_appid": 8190,
          "required_age": 17,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Dive into an adrenaline-fuelled free-roaming adventure with 400 square miles of rugged terrain and hundreds of weapons and vehicles.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, German<strong>*</strong>, Italian<strong>*</strong>, Spanish - Spain<strong>*</strong>, Polish, Russian<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/8190/header.jpg?t=1530644128",
          "website": "http://www.justcause.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1499,
            "final": 299,
            "discount_percent": 80
          },
          "packages": [
            4097
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 84,
            "url": "https://www.metacritic.com/game/pc/just-cause-2?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 25,
              "description": "Adventure"
            }
          ],
          "recommendations": {
            "total": 26169
          },
          "release_date": {
            "coming_soon": false,
            "date": "Mar 23, 2010"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/8190/page_bg_generated_v6b.jpg?t=1530644128",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Arma 2",
          "steam_appid": 33900,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "Building on 10 years of constant engine development, ARMA II boasts the most realistic combat environment in the world. It models real world ballistics &amp; round deflection, materials penetration, features a realtime day/night cycle and dynamic wind, weather and environmental effects.",
          "supported_languages": "English<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/33900/header.jpg?t=1521639563",
          "website": "http://www.arma2.com",
          "price_overview": {
            "currency": "USD",
            "initial": 1299,
            "final": 259,
            "discount_percent": 80
          },
          "packages": [
            1664,
            4639,
            40710,
            8701
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 77,
            "url": "https://www.metacritic.com/game/pc/arma-ii?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 13,
              "description": "Captions available"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 28,
              "description": "Simulation"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 1771
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jun 29, 2009"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/33900/page_bg_generated_v6b.jpg?t=1521639563",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Arma 2: Operation Arrowhead",
          "steam_appid": 33930,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "Three years after the conflict in Chernarus, portrayed in the original Arma 2, a new flashpoint explodes in the Green Sea Region. Coalition forces led by the US Army are deployed to Takistan to quickly restore peace and prevent further civilian casualties.",
          "supported_languages": "English<strong>*</strong>, Czech, French, Italian, Spanish - Spain, German, Polish, Russian<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/33930/header.jpg?t=1478602186",
          "website": "http://www.arma2.com",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 399,
            "discount_percent": 80
          },
          "packages": [
            4637,
            4639,
            40710,
            8701
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 73,
            "url": "https://www.metacritic.com/game/pc/arma-ii-operation-arrowhead?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 13,
              "description": "Captions available"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 28,
              "description": "Simulation"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 13831
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jun 29, 2010"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/33930/page_bg_generated_v6b.jpg?t=1478602186",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        null,
        {
          "type": "game",
          "name": "Victoria II",
          "steam_appid": 42960,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Carefully guide your nation from the era of absolute monarchies in the early 19th century, through expansion and colonization, to finally become a truly great power by the dawn of the 20th century. Victoria II is a grand strategy game played during the colonial era of the 19th century, where the player takes control of a country, guiding...",
          "supported_languages": "English, French, German",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/42960/header.jpg?t=1508406259",
          "website": "http://www.victoria2.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 499,
            "discount_percent": 75
          },
          "packages": [
            4958
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 75,
            "url": "https://www.metacritic.com/game/pc/victoria-ii?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            }
          ],
          "genres": [
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 3772
          },
          "release_date": {
            "coming_soon": false,
            "date": "Aug 30, 2010"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/42960/page_bg_generated_v6b.jpg?t=1508406259",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Mirror's Edge™",
          "steam_appid": 17410,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "In a city where information is heavily monitored, agile couriers called Runners transport sensitive data away from prying eyes. In this seemingly utopian paradise, a crime has been committed, your sister has been framed and now you are being hunted.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, German<strong>*</strong>, Italian<strong>*</strong>, Spanish - Spain<strong>*</strong>, Czech, Russian<strong>*</strong>, Polish, Hungarian, Portuguese<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/17410/header.jpg?t=1447351617",
          "website": "http://www.mirrorsedge.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1999,
            "discount_percent": 0
          },
          "packages": [
            1295
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 81,
            "url": "http://www.metacritic.com/game/pc/mirrors-edge-2008?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 25,
              "description": "Adventure"
            }
          ],
          "recommendations": {
            "total": 14220
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jan 14, 2009"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/17410/page_bg_generated_v6b.jpg?t=1447351617",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Lost Planet® 2",
          "steam_appid": 45750,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Lost Planet 2, the sequel to Lost Planet™: Extreme Condition, the landmark third-person shooter that sold over 2.3 million units worldwide, is now available on Steam!",
          "supported_languages": "English<strong>*</strong>, French, German, Italian, Spanish - Spain, Japanese, Korean, Polish, Russian<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/45750/header.jpg?t=1540579196",
          "website": "http://www.lostplanetcommunity.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1999,
            "discount_percent": 0
          },
          "packages": [
            6310
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 63,
            "url": "https://www.metacritic.com/game/pc/lost-planet-2?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 25,
              "description": "Adventure"
            }
          ],
          "recommendations": {
            "total": 1155
          },
          "release_date": {
            "coming_soon": false,
            "date": "Oct 15, 2010"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/45750/page_bg_generated_v6b.jpg?t=1540579196",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "MX vs. ATV Reflex",
          "steam_appid": 55140,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Think fast and hang on to your ride as you take independent control of the rider and take the ultimate test of mettle. Dual controls let you tear it up with death-defying tricks and high-flying freestyle action. Fight for traction and dig up the track to leave your mark.",
          "supported_languages": "English, French, German, Italian, Spanish - Spain",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/55140/header.jpg?t=1533041001",
          "website": "http://www.mxvsatv.com",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1999,
            "discount_percent": 0
          },
          "packages": [
            6727,
            241406,
            123985
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": null,
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 9,
              "description": "Racing"
            }
          ],
          "recommendations": {
            "total": 1255
          },
          "release_date": {
            "coming_soon": false,
            "date": "Nov 26, 2010"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/55140/page_bg_generated_v6b.jpg?t=1533041001",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Magicka",
          "steam_appid": 42910,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Magicka is a satirical action-adventure game set in a rich fantasy world based on Norse mythology. The player assumes the role of a wizard from a sacred order tasked with stopping an evil sorcerer who has thrown the world into turmoil, his foul creations besieging the forces of good.",
          "supported_languages": "English, Russian, French, German, Italian, Polish, Spanish - Spain",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/42910/header.jpg?t=1530639178",
          "website": "http://www.magickagame.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 249,
            "discount_percent": 75
          },
          "packages": [
            7254
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 74,
            "url": "https://www.metacritic.com/game/pc/magicka?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 24,
              "description": "Shared/Split Screen"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 12480
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jan 25, 2011"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/42910/page_bg_generated_v6b.jpg?t=1530639178",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Cities in Motion",
          "steam_appid": 73010,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Manage transportation for commuters in four of the world's greatest cities - Vienna, Helsinki, Berlin, and Amsterdam",
          "supported_languages": "English, German, Spanish - Spain, French",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/73010/header.jpg?t=1447353921",
          "website": "http://www.citiesinmotion.com",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 499,
            "discount_percent": 75
          },
          "packages": [
            7420,
            29078,
            35269,
            29532
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 70,
            "url": "https://www.metacritic.com/game/pc/cities-in-motion?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            }
          ],
          "genres": [
            {
              "id": 28,
              "description": "Simulation"
            }
          ],
          "recommendations": {
            "total": 477
          },
          "release_date": {
            "coming_soon": false,
            "date": "Feb 22, 2011"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/73010/page_bg_generated_v6b.jpg?t=1447353921",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Portal",
          "steam_appid": 400,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Portal&trade; is a new single player game from Valve. Set in the mysterious Aperture Science Laboratories, Portal has been called one of the most innovative new games on the horizon and will offer gamers hours of unique gameplay.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, German<strong>*</strong>, Russian<strong>*</strong>, Danish, Dutch, Finnish, Italian, Japanese, Norwegian, Polish, Portuguese, Simplified Chinese, Spanish - Spain<strong>*</strong>, Swedish, Traditional Chinese<strong>*</strong>, Korean<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/400/header.jpg?t=1512752294",
          "website": "http://www.whatistheorangebox.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 999,
            "discount_percent": 0
          },
          "packages": [
            515,
            204527,
            469
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 90,
            "url": "https://www.metacritic.com/game/pc/portal?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 13,
              "description": "Captions available"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            },
            {
              "id": 16,
              "description": "Includes Source SDK"
            },
            {
              "id": 14,
              "description": "Commentary available"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 36847
          },
          "release_date": {
            "coming_soon": false,
            "date": "Oct 10, 2007"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/400/page_bg_generated_v6b.jpg?t=1512752294",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Portal 2",
          "steam_appid": 620,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "The &quot;Perpetual Testing Initiative&quot; has been expanded to allow you to design co-op puzzles for you and your friends!",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, German<strong>*</strong>, Spanish - Spain<strong>*</strong>, Czech, Danish, Dutch, Finnish, Hungarian, Italian, Japanese, Korean, Norwegian, Polish, Portuguese, Romanian, Russian<strong>*</strong>, Simplified Chinese, Swedish, Thai, Traditional Chinese, Turkish<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/620/header.jpg?t=1512411524",
          "website": "http://www.thinkwithportals.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 999,
            "discount_percent": 0
          },
          "packages": [
            7877,
            204528,
            8187
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 95,
            "url": "https://www.metacritic.com/game/pc/portal-2?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 13,
              "description": "Captions available"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 15,
              "description": "Stats"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            },
            {
              "id": 14,
              "description": "Commentary available"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 25,
              "description": "Adventure"
            }
          ],
          "recommendations": {
            "total": 93258
          },
          "release_date": {
            "coming_soon": false,
            "date": "Apr 18, 2011"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/620/page_bg_generated_v6b.jpg?t=1512411524",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Red Faction®: Armageddon™",
          "steam_appid": 55110,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "Red Faction: Armageddon Path to War includes 4 new missions, 2 unlockable items and 10 new achievements!",
          "supported_languages": "English, French, German, Italian, Polish, Russian, Spanish - Spain",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/55110/header.jpg?t=1533041444",
          "website": "http://www.redfaction.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1999,
            "discount_percent": 0
          },
          "packages": [
            8392,
            241419,
            15630,
            123985
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 75,
            "url": "https://www.metacritic.com/game/pc/red-faction-armageddon?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 8,
              "description": "Valve Anti-Cheat enabled"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 1718
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jun 6, 2011"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/55110/page_bg_generated_v6b.jpg?t=1533041444",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Universe Sandbox",
          "steam_appid": 72200,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Create and destroy on a scale you’ve never imagined!",
          "supported_languages": "English",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/72200/header.jpg?t=1478131333",
          "website": "http://universesandbox.com/",
          "price_overview": null,
          "packages": null,
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 83,
            "url": "https://www.metacritic.com/game/pc/universe-sandbox?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 15,
              "description": "Stats"
            }
          ],
          "genres": [
            {
              "id": 4,
              "description": "Casual"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 28,
              "description": "Simulation"
            }
          ],
          "recommendations": {
            "total": 2178
          },
          "release_date": {
            "coming_soon": false,
            "date": "Apr 29, 2011"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/72200/page_bg_generated_v6b.jpg?t=1478131333",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "The Witcher 2: Assassins of Kings Enhanced Edition",
          "steam_appid": 20920,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "A time of untold chaos has come. Mighty forces clash behind the scenes in a struggle for power and influence. The Northern Kingdoms mobilize for war. But armies on the march are not enough to stop a bloody conspiracy.",
          "supported_languages": "English<strong>*</strong>, German<strong>*</strong>, French<strong>*</strong>, Spanish - Spain, Russian<strong>*</strong>, Czech, Hungarian, Japanese, Polish<strong>*</strong>, Turkish, Traditional Chinese, Italian<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/20920/header.jpg?t=1540479596",
          "website": "http://www.thewitcher.com",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 299,
            "discount_percent": 85
          },
          "packages": [
            8186,
            303246
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 88,
            "url": "https://www.metacritic.com/game/pc/the-witcher-2-assassins-of-kings?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            }
          ],
          "genres": [
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 32762
          },
          "release_date": {
            "coming_soon": false,
            "date": "Apr 16, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/20920/page_bg_generated_v6b.jpg?t=1540479596",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Beat Hazard",
          "steam_appid": 49600,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Experience your music collection like never before with this intense music driven arcade shooter. Each of your songs will have its own unique ebb and flow based on the music.",
          "supported_languages": "English, French, German, Italian, Spanish - Spain, Dutch",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/49600/header.jpg?t=1508321478",
          "website": "http://www.coldbeamgames.com",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 199,
            "discount_percent": 80
          },
          "packages": [
            4155
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 70,
            "url": "https://www.metacritic.com/game/pc/beat-hazard?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 24,
              "description": "Shared/Split Screen"
            },
            {
              "id": 27,
              "description": "Cross-Platform Multiplayer"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 4,
              "description": "Casual"
            },
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": {
            "total": 4420
          },
          "release_date": {
            "coming_soon": false,
            "date": "Apr 15, 2010"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/49600/page_bg_generated_v6b.jpg?t=1508321478",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Terraria",
          "steam_appid": 105600,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Dig, fight, explore, build! Nothing is impossible in this action-packed adventure game. Four Pack also available!",
          "supported_languages": "English, French, Italian, German, Spanish - Spain, Polish, Portuguese - Brazil, Russian, Simplified Chinese",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/105600/header.jpg?t=1529004887",
          "website": "http://www.terraria.org/",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 499,
            "discount_percent": 50
          },
          "packages": [
            8183,
            8184
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 83,
            "url": "https://www.metacritic.com/game/pc/terraria?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 36,
              "description": "Online Multi-Player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 38,
              "description": "Online Co-op"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 25,
              "description": "Adventure"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 178434
          },
          "release_date": {
            "coming_soon": false,
            "date": "May 16, 2011"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/105600/page_bg_generated_v6b.jpg?t=1529004887",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Solar 2",
          "steam_appid": 97000,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Dynamic abstract sandbox universe. Changes and evolves as you do.",
          "supported_languages": "English",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/97000/header.jpg?t=1447354312",
          "website": "http://murudai.com/solar/",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 999,
            "discount_percent": 0
          },
          "packages": [
            8535
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 72,
            "url": "https://www.metacritic.com/game/pc/solar-2?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 15,
              "description": "Stats"
            }
          ],
          "genres": [
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 4,
              "description": "Casual"
            }
          ],
          "recommendations": {
            "total": 1102
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jun 17, 2011"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/97000/page_bg_generated_v6b.jpg?t=1447354312",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Warhammer 40,000: Space Marine",
          "steam_appid": 55150,
          "required_age": 17,
          "is_free": false,
          "controller_support": "full",
          "short_description": "In Warhammer® 40,000® Space Marine® you are Captain Titus, a Space Marine of the Ultramarines chapter and a seasoned veteran of countless battles.",
          "supported_languages": "English, French, German, Italian, Spanish - Spain, Russian<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/55150/header.jpg?t=1528131586",
          "website": "http://www.spacemarine.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 2999,
            "final": 2999,
            "discount_percent": 0
          },
          "packages": [
            11443,
            15351,
            116764
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 74,
            "url": "https://www.metacritic.com/game/pc/warhammer-40000-space-marine?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 4806
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 5, 2011"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/55150/page_bg_generated_v6b.jpg?t=1528131586",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Red Orchestra 2: Heroes of Stalingrad with Rising Storm",
          "steam_appid": 35450,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "Contains full Rising Storm content as well!",
          "supported_languages": "English<strong>*</strong>, French, German<strong>*</strong>, Russian<strong>*</strong>, Polish<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/35450/header.jpg?t=1529341005",
          "website": "http://www.heroesofstalingrad.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1999,
            "discount_percent": 0
          },
          "packages": [
            61255,
            61257,
            11412
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 76,
            "url": "https://www.metacritic.com/game/pc/red-orchestra-2-heroes-of-stalingrad?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 36,
              "description": "Online Multi-Player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 8,
              "description": "Valve Anti-Cheat enabled"
            },
            {
              "id": 15,
              "description": "Stats"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 29,
              "description": "Massively Multiplayer"
            },
            {
              "id": 28,
              "description": "Simulation"
            }
          ],
          "recommendations": {
            "total": 17483
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 13, 2011"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/35450/page_bg_generated_v6b.jpg?t=1529341005",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "The Elder Scrolls V: Skyrim",
          "steam_appid": 72850,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "EPIC FANTASY REBORN The next chapter in the highly anticipated Elder Scrolls saga arrives from the makers of the 2006 and 2008 Games of the Year, Bethesda Game Studios. Skyrim reimagines and revolutionizes the open-world fantasy epic, bringing to life a complete virtual world open for you to explore any way you choose.",
          "supported_languages": "English, French, German, Italian, Spanish - Spain, Japanese, Czech, Polish, Russian",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/72850/header.jpg?t=1493767797",
          "website": "http://elderscrolls.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1999,
            "discount_percent": 0
          },
          "packages": [
            12248
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 94,
            "url": "https://www.metacritic.com/game/pc/the-elder-scrolls-v-skyrim?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 152523
          },
          "release_date": {
            "coming_soon": false,
            "date": "Nov 10, 2011"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/72850/page_bg_generated_v6b.jpg?t=1493767797",
          "content_descriptors": {
            "ids": [
              5
            ],
            "notes": null
          }
        },
        null,
        {
          "type": "game",
          "name": "Tropico 4",
          "steam_appid": 57690,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "The world is changing and Tropico is moving with the times - geographical powers rise and fall and the world market is dominated by new players with new demands and offers - and you, as El Presidente, face a whole new set of challenges.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, German<strong>*</strong>, Italian<strong>*</strong>, Spanish - Spain<strong>*</strong>, Korean<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/57690/header.jpg?t=1535973552",
          "website": "http://www.worldoftropico.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1499,
            "final": 1499,
            "discount_percent": 0
          },
          "packages": [
            11400,
            19282
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": false
          },
          "metacritic": {
            "score": 78,
            "url": "https://www.metacritic.com/game/pc/tropico-4?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            }
          ],
          "genres": [
            {
              "id": 28,
              "description": "Simulation"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 5986
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 1, 2011"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/57690/page_bg_generated_v6b.jpg?t=1535973552",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "PAYDAY™ The Heist",
          "steam_appid": 24240,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "Take on the role of a hardened career criminal executing intense, dynamic heists in constant pursuit of the next “big score”",
          "supported_languages": "English<strong>*</strong>, French, German, Italian, Spanish - Spain<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/24240/header.jpg?t=1516099628",
          "website": "http://www.overkillsoftware.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1499,
            "final": 1499,
            "discount_percent": 0
          },
          "packages": [
            11675
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 76,
            "url": "https://www.metacritic.com/game/pc/payday-the-heist?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 15,
              "description": "Stats"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 18134
          },
          "release_date": {
            "coming_soon": false,
            "date": "Oct 20, 2011"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/24240/page_bg_generated_v6b.jpg?t=1516099628",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "The Binding of Isaac",
          "steam_appid": 113200,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Now 20% More Evil with the Free Halloween update!",
          "supported_languages": "English<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/113200/header.jpg?t=1447354527",
          "website": null,
          "price_overview": {
            "currency": "USD",
            "initial": 499,
            "final": 499,
            "discount_percent": 0
          },
          "packages": [
            11734,
            15408
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": false
          },
          "metacritic": {
            "score": 84,
            "url": "https://www.metacritic.com/game/pc/the-binding-of-isaac?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 25,
              "description": "Adventure"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 32769
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 28, 2011"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/113200/page_bg_generated_v6b.jpg?t=1447354527",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Serious Sam 3: BFE",
          "steam_appid": 41070,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Serious Sam 3: BFE is a prequel to the original indie fast action FPS and Game of the Year sensation - Serious Sam: The First Encounter!",
          "supported_languages": "English<strong>*</strong>, French, German, Italian, Spanish - Spain, Russian<strong>*</strong>, Japanese, Simplified Chinese, Bulgarian<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/41070/header.jpg?t=1498679919",
          "website": "http://www.croteam.com",
          "price_overview": {
            "currency": "USD",
            "initial": 3999,
            "final": 399,
            "discount_percent": 90
          },
          "packages": [
            12361
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 72,
            "url": "https://www.metacritic.com/game/pc/serious-sam-3-bfe?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 24,
              "description": "Shared/Split Screen"
            },
            {
              "id": 27,
              "description": "Cross-Platform Multiplayer"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": {
            "total": 11831
          },
          "release_date": {
            "coming_soon": false,
            "date": "Nov 22, 2011"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/41070/page_bg_generated_v6b.jpg?t=1498679919",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Saints Row: The Third",
          "steam_appid": 55230,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "Get ready for the most out-landish gameplay scenarios ever seen as the Third Street Saints take on the Syndicate!",
          "supported_languages": "Czech, Dutch, English<strong>*</strong>, French, German, Italian, Polish, Russian, Spanish - Spain<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/55230/header.jpg?t=1490283037",
          "website": "http://www.saintsrow.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 999,
            "discount_percent": 0
          },
          "packages": [
            12255,
            17933
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": true
          },
          "metacritic": {
            "score": 84,
            "url": "https://www.metacritic.com/game/pc/saints-row-the-third?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 28499
          },
          "release_date": {
            "coming_soon": false,
            "date": "Nov 14, 2011"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/55230/page_bg_generated_v6b.jpg?t=1490283037",
          "content_descriptors": {
            "ids": [
              5
            ],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Serious Sam Fusion 2017 (beta)",
          "steam_appid": 564310,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Serious Sam Fusion is a central hub for existing and upcoming Serious Sam games developed by Croteam. Cool new features, engine upgrades, patches and updates will be released to existing owners for FREE!",
          "supported_languages": "English<strong>*</strong>, French, Italian, German, Spanish - Spain, Russian<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/564310/header.jpg?t=1517577602",
          "website": "http://www.croteam.com",
          "price_overview": {
            "currency": "USD",
            "initial": 1499,
            "final": 224,
            "discount_percent": 85
          },
          "packages": [
            2535,
            137182
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": null,
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 36,
              "description": "Online Multi-Player"
            },
            {
              "id": 37,
              "description": "Local Multi-Player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 38,
              "description": "Online Co-op"
            },
            {
              "id": 39,
              "description": "Local Co-op"
            },
            {
              "id": 24,
              "description": "Shared/Split Screen"
            },
            {
              "id": 27,
              "description": "Cross-Platform Multiplayer"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            }
          ],
          "genres": [
            {
              "id": 73,
              "description": "Violent"
            },
            {
              "id": 74,
              "description": "Gore"
            },
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": {
            "total": 1091
          },
          "release_date": {
            "coming_soon": false,
            "date": ""
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/564310/page_bg_generated_v6b.jpg?t=1517577602",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Renegade Ops",
          "steam_appid": 99300,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Blast your way through enemy lines to defeat Inferno, a madman intent on global domination. Destruction just got awesome.",
          "supported_languages": "English, French, German, Italian, Spanish - Spain",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/99300/header.jpg?t=1522061011",
          "website": "http://www.sega.co.uk/renegadeops/?t=EnglishUK",
          "price_overview": {
            "currency": "USD",
            "initial": 1500,
            "final": 1500,
            "discount_percent": 0
          },
          "packages": [
            12598,
            13173,
            27830
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 76,
            "url": "https://www.metacritic.com/game/pc/renegade-ops?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 24,
              "description": "Shared/Split Screen"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 557
          },
          "release_date": {
            "coming_soon": false,
            "date": "Oct 26, 2011"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/99300/page_bg_generated_v6b.jpg?t=1522061011",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "X2: The Threat",
          "steam_appid": 2800,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "X²: The Threat is of a new generation of space simulator games, you play the role of Julian Gardna who continues the story set by X: Beyond The Frontier. The updated graphics engine gives the universe a fresher feel with newly designed ships and stations adding to the complexity of the universe.",
          "supported_languages": "English<strong>*</strong>, French, German<strong>*</strong>, Italian, Spanish - Spain<strong>*</strong>, Czech, Polish, Russian<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/2800/header.jpg?t=1512663843",
          "website": "http://www.egosoft.com/games/x2/info_en.php",
          "price_overview": {
            "currency": "USD",
            "initial": 499,
            "final": 249,
            "discount_percent": 50
          },
          "packages": [
            100,
            6330,
            93016
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 72,
            "url": "https://www.metacritic.com/game/pc/x2-the-threat?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 13,
              "description": "Captions available"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 191
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jul 21, 2006"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/2800/page_bg_generated_v6b.jpg?t=1512663843",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "X3: Reunion",
          "steam_appid": 2810,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "The Sequel to the award winning X²: The Threat introduces a new 3D engine as well as a new story, new ships and a new gameplay to greatly increase the variety in the X-universe. The economy of X³: Reunion is more complex than anything seen in the X-universe before.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, German<strong>*</strong>, Spanish - Spain<strong>*</strong>, Italian, Russian<strong>*</strong>, Simplified Chinese, Traditional Chinese, Czech, Polish<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/2810/header.jpg?t=1512663830",
          "website": "http://www.egosoft.com/games/x3/info_en.php",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 499,
            "discount_percent": 50
          },
          "packages": [
            101,
            12985,
            6330,
            93016
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 71,
            "url": "https://www.metacritic.com/game/pc/x3-reunion?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 13,
              "description": "Captions available"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 279
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jul 21, 2006"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/2810/page_bg_generated_v6b.jpg?t=1512663830",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "X: Beyond the Frontier",
          "steam_appid": 2840,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "The Human Race had advanced to the point where we could travel among the stars, we developed giant automated machines to help us colonise other worlds, but there was a fault in their programming and they turned and attacked. Forcing us to lay a trap to protect Earth and exiling the Human race to stay on Earth once again.",
          "supported_languages": "English<strong>*</strong>, German<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/2840/header.jpg?t=1512663836",
          "website": "http://www.egosoft.com/games/x/info_en.php",
          "price_overview": {
            "currency": "USD",
            "initial": 499,
            "final": 249,
            "discount_percent": 50
          },
          "packages": [
            6353,
            6330,
            93016
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 67,
            "url": "https://www.metacritic.com/game/pc/x-beyond-the-frontier?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 28,
              "description": "Simulation"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 117
          },
          "release_date": {
            "coming_soon": false,
            "date": "Oct 8, 2010"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/2840/page_bg_generated_v6b.jpg?t=1512663836",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "X3: Terran Conflict",
          "steam_appid": 2820,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "It is the year 2938. The long wished-for encounter of the X Universe and the Earth holds both joy and sorrow for the people. Despite flourishing trade, the clash of the diverse races, cultures and life forms creates new tensions, mistrust and open conflict that need to be overcome!",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, German<strong>*</strong>, Italian, Russian<strong>*</strong>, Polish, Simplified Chinese, Traditional Chinese, Czech, Spanish - Spain, Japanese<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/2820/header.jpg?t=1512663827",
          "website": "http://www.egosoft.com/games/x3tc/info_en.php",
          "price_overview": {
            "currency": "USD",
            "initial": 1599,
            "final": 399,
            "discount_percent": 75
          },
          "packages": [
            1040,
            232278,
            12588,
            12985,
            6330,
            93016
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 73,
            "url": "https://www.metacritic.com/game/pc/x3-terran-conflict?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 13,
              "description": "Captions available"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 28,
              "description": "Simulation"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 1263
          },
          "release_date": {
            "coming_soon": false,
            "date": "Oct 16, 2008"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/2820/page_bg_generated_v6b.jpg?t=1512663827",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "dlc",
          "name": "X3: Albion Prelude",
          "steam_appid": 201310,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "X3: Albion Prelude is the latest game in the X3 space game series. TRADE, FIGHT, BUILD, THINK in a living and breathing universe. A new plot and many additions to the open free-form gameplay.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, German<strong>*</strong>, Italian, Russian<strong>*</strong>, Polish, Simplified Chinese, Traditional Chinese, Spanish - Spain, Japanese<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/201310/header.jpg?t=1512657152",
          "website": "http://store.steampowered.com/sale/xfranchise",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 499,
            "discount_percent": 50
          },
          "packages": [
            12589,
            12588,
            12985,
            6330,
            93016
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 75,
            "url": "https://www.metacritic.com/game/pc/x3-albion-prelude?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 21,
              "description": "Downloadable Content"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 13,
              "description": "Captions available"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 28,
              "description": "Simulation"
            }
          ],
          "recommendations": {
            "total": 985
          },
          "release_date": {
            "coming_soon": false,
            "date": "Dec 15, 2011"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/201310/page_bg_generated_v6b.jpg?t=1512657152",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "X: Tension",
          "steam_appid": 2850,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "X-Tension is the eagerly awaited expansion pack to X: Beyond the Frontier. The expansion is not limited by a linear plot line but makes use of new ways to expand your empire. You can now take part in missions that are offered to you throughout the game.",
          "supported_languages": "English<strong>*</strong>, German<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/2850/header.jpg?t=1512663848",
          "website": "http://www.egosoft.com/games/x_tension/info_en.php",
          "price_overview": {
            "currency": "USD",
            "initial": 499,
            "final": 249,
            "discount_percent": 50
          },
          "packages": [
            6354,
            6330,
            93016
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": null,
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 28,
              "description": "Simulation"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": null,
          "release_date": {
            "coming_soon": false,
            "date": "Oct 8, 2010"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/2850/page_bg_generated_v6b.jpg?t=1512663848",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Crusader Kings II",
          "steam_appid": 203770,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Explore one of the defining periods in world history in an experience crafted by the masters of Grand Strategy.",
          "supported_languages": "English, French, German, Spanish - Spain",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/203770/header.jpg?t=1539181372",
          "website": "http://www.crusaderkings.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 3999,
            "final": 3999,
            "discount_percent": 0
          },
          "packages": [
            13408
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 82,
            "url": "https://www.metacritic.com/game/pc/crusader-kings-ii?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            }
          ],
          "genres": [
            {
              "id": 3,
              "description": "RPG"
            },
            {
              "id": 28,
              "description": "Simulation"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 18124
          },
          "release_date": {
            "coming_soon": false,
            "date": "Feb 14, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/203770/page_bg_generated_v6b.jpg?t=1539181372",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "LIMBO",
          "steam_appid": 48000,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Uncertain of his sister's fate, a boy enters LIMBO",
          "supported_languages": "English, French, German, Italian, Japanese, Korean, Portuguese, Spanish - Spain, Traditional Chinese, Polish, Portuguese - Brazil, Russian, Simplified Chinese, Turkish",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/48000/header.jpg?t=1478090357",
          "website": "http://playdead.com/limbo",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 199,
            "discount_percent": 80
          },
          "packages": [
            11010
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 88,
            "url": "https://www.metacritic.com/game/pc/limbo?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 25,
              "description": "Adventure"
            },
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": {
            "total": 13676
          },
          "release_date": {
            "coming_soon": false,
            "date": "Aug 2, 2011"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/48000/page_bg_generated_v6b.jpg?t=1478090357",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Wargame: European Escalation",
          "steam_appid": 58610,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "The New Fatal Error DLC includes a new 5-mission Operation and touch-screen controls.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, German<strong>*</strong>, Italian, Spanish - Spain, Russian, Traditional Chinese<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/58610/header.jpg?t=1505225615",
          "website": "http://wargame-ee.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 999,
            "discount_percent": 0
          },
          "packages": [
            13455
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 81,
            "url": "https://www.metacritic.com/game/pc/wargame-european-escalation?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 8,
              "description": "Valve Anti-Cheat enabled"
            }
          ],
          "genres": [
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 1827
          },
          "release_date": {
            "coming_soon": false,
            "date": "Feb 22, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/58610/page_bg_generated_v6b.jpg?t=1505225615",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Fallout: New Vegas",
          "steam_appid": 22380,
          "required_age": 16,
          "is_free": false,
          "controller_support": null,
          "short_description": "Welcome to Vegas. New Vegas. Enjoy your stay!",
          "supported_languages": "English, French, German, Italian, Spanish - Spain",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/22380/header.jpg?t=1533678449",
          "website": "http://fallout.bethsoft.com",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 999,
            "discount_percent": 0
          },
          "packages": [
            6442,
            13435
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 84,
            "url": "https://www.metacritic.com/game/pc/fallout-new-vegas?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 46981
          },
          "release_date": {
            "coming_soon": false,
            "date": "Oct 19, 2010"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/22380/page_bg_generated_v6b.jpg?t=1533678449",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "A Virus Named TOM",
          "steam_appid": 207650,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Hack your way through brain scrambling puzzles while maneuvering through a thumb cramping maze of enemies.",
          "supported_languages": "English<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/207650/header.jpg?t=1478218252",
          "website": "http://www.avirusnamedtom.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 999,
            "discount_percent": 0
          },
          "packages": [
            15935,
            15937
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 65,
            "url": "https://www.metacritic.com/game/pc/a-virus-named-tom?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 24,
              "description": "Shared/Split Screen"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": null,
          "release_date": {
            "coming_soon": false,
            "date": "Aug 1, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/207650/page_bg_generated_v6b.jpg?t=1478218252",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Orcs Must Die!",
          "steam_appid": 102600,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Slice them, burn them, skewer them, and launch them - no matter how you get it done, orcs must die in this fantasy action-strategy game from Robot Entertainment. As a powerful War Mage with dozens of deadly weapons, spells, and traps at your fingertips, defend twenty-four fortresses from a rampaging mob of beastly enemies, including...",
          "supported_languages": "English<strong>*</strong>, German<strong>*</strong>, French<strong>*</strong>, Italian<strong>*</strong>, Spanish - Spain<strong>*</strong>, Russian<strong>*</strong>, Japanese<strong>*</strong>, Polish<strong>*</strong>, Portuguese - Brazil<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/102600/header.jpg?t=1537484197",
          "website": "http://www.orcsmustdie.com",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 249,
            "discount_percent": 75
          },
          "packages": [
            11920,
            13743
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 83,
            "url": "https://www.metacritic.com/game/pc/orcs-must-die!?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 15,
              "description": "Stats"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 4030
          },
          "release_date": {
            "coming_soon": false,
            "date": "Oct 11, 2011"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/102600/page_bg_generated_v6b.jpg?t=1537484197",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "L.A. Noire",
          "steam_appid": 110800,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "L.A. Noire is a violent crime thriller that blends breathtaking action with true detective work to deliver an unprecedented interactive experience. Search for clues, chase down suspects and interrogate witnesses as you struggle to find the truth in a city where everyone has something to hide.",
          "supported_languages": "English<strong>*</strong>, French, German, Italian, Russian, Spanish - Spain<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/110800/header.jpg?t=1533107668",
          "website": "http://www.rockstargames.com/lanoire/agegate/ref/?redirect=",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1999,
            "discount_percent": 0
          },
          "packages": [
            13740,
            12072
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 83,
            "url": "https://www.metacritic.com/game/pc/la-noire-the-complete-edition?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            }
          ],
          "genres": [
            {
              "id": 25,
              "description": "Adventure"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 12527
          },
          "release_date": {
            "coming_soon": false,
            "date": "Nov 8, 2011"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/110800/page_bg_generated_v6b.jpg?t=1533107668",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Men of War: Red Tide",
          "steam_appid": 3130,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Men of War: Red Tide is a sequel to the critically acclaimed RTS Men of War. Red Tide introduces a new story driven campaign based on the writings of Soviet scribe Alexander Zorich, it also includes dozens of new or upgraded units and weapons.",
          "supported_languages": "English<strong>*</strong>, Russian<strong>*</strong>, German, French<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/3130/header.jpg?t=1539178490",
          "website": "http://www.menofwargame.com",
          "price_overview": {
            "currency": "USD",
            "initial": 499,
            "final": 124,
            "discount_percent": 75
          },
          "packages": [
            2365,
            14299
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 77,
            "url": "https://www.metacritic.com/game/pc/men-of-war-red-tide?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 261
          },
          "release_date": {
            "coming_soon": false,
            "date": "Nov 1, 2009"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/3130/page_bg_generated_v6b.jpg?t=1539178490",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Men of War: Vietnam",
          "steam_appid": 63940,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "The critically acclaimed series returns! Experience Vietnam from both sides of the war.",
          "supported_languages": "English<strong>*</strong>, German<strong>*</strong>, Italian<strong>*</strong>, Polish, Russian<strong>*</strong>, Spanish - Spain<strong>*</strong>, French<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/63940/header.jpg?t=1539178549",
          "website": "http://www.menofwargame.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 799,
            "final": 199,
            "discount_percent": 75
          },
          "packages": [
            11498,
            11323,
            14299
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 68,
            "url": "https://www.metacritic.com/game/pc/men-of-war-vietnam?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            }
          ],
          "genres": [
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 505
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 8, 2011"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/63940/page_bg_generated_v6b.jpg?t=1539178549",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Men of War™",
          "steam_appid": 7830,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Men of War is a stunning Real-Time Strategy game that takes place during the height of World War II. Intense battles span Europe and North Africa as gamers play as Soviet, Allied or German forces across 19 massive single-player missions.",
          "supported_languages": "English<strong>*</strong>, Russian<strong>*</strong>, French<strong>*</strong>, Italian<strong>*</strong>, Spanish - Spain<strong>*</strong>, German<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/7830/header.jpg?t=1539763877",
          "website": "http://www.menofwargame.com",
          "price_overview": {
            "currency": "USD",
            "initial": 499,
            "final": 124,
            "discount_percent": 75
          },
          "packages": [
            1610,
            14299
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 80,
            "url": "https://www.metacritic.com/game/pc/men-of-war?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            }
          ],
          "genres": [
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 1547
          },
          "release_date": {
            "coming_soon": false,
            "date": "May 6, 2009"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/7830/page_bg_generated_v6b.jpg?t=1539763877",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Men of War: Condemned Heroes",
          "steam_appid": 204860,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Men of War: Condemned Heroes tells the story of one of the infamous Soviet penal battalions during the WWII.",
          "supported_languages": "English<strong>*</strong>, Russian<strong>*</strong>, French, German, Italian, Spanish - Spain<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/204860/header.jpg?t=1539178827",
          "website": "http://www.menofwargame.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 799,
            "final": 199,
            "discount_percent": 75
          },
          "packages": [
            14032,
            14299
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 57,
            "url": "https://www.metacritic.com/game/pc/men-of-war-condemned-heroes?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 185
          },
          "release_date": {
            "coming_soon": false,
            "date": "Apr 12, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/204860/page_bg_generated_v6b.jpg?t=1539178827",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Men of War: Assault Squad",
          "steam_appid": 64000,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Men of War: Assault Squad features a completely new cooperative skirmish game mode with access to five different nations (Russia, Germany, USA, Commonwealth and, for the first time ever in the Men of War series, Japan) as well as increased realism and accessibility.",
          "supported_languages": "English, Russian, Italian, Spanish - Spain, French, German, Polish",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/64000/header.jpg?t=1539764412",
          "website": "http://www.menofwargame.com/assault/",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 249,
            "discount_percent": 75
          },
          "packages": [
            7452,
            13358,
            14299,
            13471
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 77,
            "url": "https://www.metacritic.com/game/pc/men-of-war-assault-squad?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            }
          ],
          "genres": [
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 2385
          },
          "release_date": {
            "coming_soon": false,
            "date": "Feb 24, 2011"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/64000/page_bg_generated_v6b.jpg?t=1539764412",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "ORION: Prelude",
          "steam_appid": 104900,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Work together to survive the devastating Dinosaur horde in huge, endless environments.",
          "supported_languages": "English<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/104900/header.jpg?t=1535736364",
          "website": null,
          "price_overview": {
            "currency": "USD",
            "initial": 99,
            "final": 62,
            "discount_percent": 37
          },
          "packages": [
            14535
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": null,
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 36,
              "description": "Online Multi-Player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 38,
              "description": "Online Co-op"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 8,
              "description": "Valve Anti-Cheat enabled"
            },
            {
              "id": 15,
              "description": "Stats"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 25,
              "description": "Adventure"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 20006
          },
          "release_date": {
            "coming_soon": false,
            "date": "Apr 16, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/104900/page_bg_generated_v6b.jpg?t=1535736364",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "BioShock™",
          "steam_appid": 7670,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "BioShock is a shooter unlike any you've ever played, loaded with weapons and tactics never seen. You'll have a complete arsenal at your disposal from simple revolvers to grenade launchers and chemical throwers, but you'll also be forced to genetically modify your DNA to create an even more deadly weapon: you.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, German<strong>*</strong>, Italian<strong>*</strong>, Spanish - Spain<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/7670/header.jpg?t=1531779231",
          "website": "http://www.BioShockGame.com",
          "price_overview": null,
          "packages": [
            451,
            127633
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": false
          },
          "metacritic": {
            "score": 96,
            "url": "https://www.metacritic.com/game/pc/bioshock?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 15214
          },
          "release_date": {
            "coming_soon": false,
            "date": "Aug 21, 2007"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/7670/page_bg_generated_v6b.jpg?t=1531779231",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "BioShock® 2",
          "steam_appid": 8850,
          "required_age": 17,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Set approximately 10 years after the events of the original BioShock, the halls of Rapture once again echo with sins of the past. Along the Atlantic coastline, a monster has been snatching little girls and bringing them back to the undersea city of Rapture.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, German<strong>*</strong>, Italian<strong>*</strong>, Spanish - Spain<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/8850/header.jpg?t=1534538233",
          "website": "http://www.bioshockgame.com",
          "price_overview": null,
          "packages": [
            81419,
            127633
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": false
          },
          "metacritic": {
            "score": 88,
            "url": "https://www.metacritic.com/game/pc/bioshock-2?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 6833
          },
          "release_date": {
            "coming_soon": false,
            "date": "Feb 9, 2010"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/8850/page_bg_generated_v6b.jpg?t=1534538233",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "BioShock™ 2 Remastered",
          "steam_appid": 409720,
          "required_age": 17,
          "is_free": false,
          "controller_support": "full",
          "short_description": "In BioShock 2, you step into the boots of the most iconic denizen of Rapture, the Big Daddy, as you explore through the decrepit and beautiful fallen city, chasing an unseen foe in search of answers and your own survival.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, Italian<strong>*</strong>, German<strong>*</strong>, Spanish - Spain<strong>*</strong>, Japanese, Simplified Chinese<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/409720/header.jpg?t=1534538139",
          "website": "http://www.bioshockgame.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 499,
            "discount_percent": 75
          },
          "packages": [
            81419,
            127633
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": null,
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 3512
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 15, 2016"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/409720/page_bg_generated_v6b.jpg?t=1534538139",
          "content_descriptors": {
            "ids": [
              5
            ],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "FTL: Faster Than Light",
          "steam_appid": 212680,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "This &quot;spaceship simulation roguelike-like&quot; allows you to take your ship and crew on an adventure through a randomly generated galaxy filled with glory and bitter defeat.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, Italian<strong>*</strong>, German<strong>*</strong>, Spanish - Spain<strong>*</strong>, Polish<strong>*</strong>, Portuguese - Brazil<strong>*</strong>, Russian<strong>*</strong>, Simplified Chinese<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/212680/header.jpg?t=1538154560",
          "website": "http://www.ftlgame.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 999,
            "discount_percent": 0
          },
          "packages": [
            16589,
            16705
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 84,
            "url": "https://www.metacritic.com/game/pc/ftl-faster-than-light?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            }
          ],
          "genres": [
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 28,
              "description": "Simulation"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 31829
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 14, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/212680/page_bg_generated_v6b.jpg?t=1538154560",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Penny Arcade's On the Rain-Slick Precipice of Darkness 3",
          "steam_appid": 213030,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "The Startling Developments Detective Agency springs into action as On the Rain-Slick Precipice of Darkness 3 begins, set in motion by a call from a mysterious source. The ever escalating perils on the Rain-Slick Precipice of Darkness will season our tender heroes to their very core!",
          "supported_languages": "English<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/213030/header.jpg?t=1447355903",
          "website": "http://rainslick.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 199,
            "final": 59,
            "discount_percent": 70
          },
          "packages": [
            15176,
            28354
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": false
          },
          "metacritic": null,
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 417
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jun 25, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/213030/page_bg_generated_v6b.jpg?t=1447355903",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Bastion",
          "steam_appid": 107100,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Discover the secrets of the Calamity, a surreal catastrophe that shattered the world to pieces.",
          "supported_languages": "English<strong>*</strong>, French, German, Italian, Spanish - Spain, Simplified Chinese<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/107100/header.jpg?t=1533920119",
          "website": "https://www.supergiantgames.com/games/bastion/",
          "price_overview": {
            "currency": "USD",
            "initial": 1499,
            "final": 1499,
            "discount_percent": 0
          },
          "packages": [
            11072,
            11157
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 86,
            "url": "https://www.metacritic.com/game/pc/bastion?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 20154
          },
          "release_date": {
            "coming_soon": false,
            "date": "Aug 16, 2011"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/107100/page_bg_generated_v6b.jpg?t=1533920119",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Spec Ops: The Line",
          "steam_appid": 50300,
          "required_age": 17,
          "is_free": false,
          "controller_support": "full",
          "short_description": "A Third-Person modern military Shooter designed to challenge players' morality by putting them in the middle of unspeakable situations.",
          "supported_languages": "English, French, German, Italian, Japanese, Spanish - Spain",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/50300/header.jpg?t=1532333777",
          "website": "http://www.specopstheline.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 2999,
            "final": 599,
            "discount_percent": 80
          },
          "packages": [
            15185
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 76,
            "url": "https://www.metacritic.com/game/pc/spec-ops-the-line?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 27,
              "description": "Cross-Platform Multiplayer"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 15,
              "description": "Stats"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 25,
              "description": "Adventure"
            }
          ],
          "recommendations": {
            "total": 17117
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jun 25, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/50300/page_bg_generated_v6b.jpg?t=1532333777",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Nuclear Dawn",
          "steam_appid": 17710,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Explore war-torn post-apocalyptic landscapes and take fight against enemies using various weapons in this FPS/RTS hybrid.",
          "supported_languages": "English<strong>*</strong>, Czech, German<strong>*</strong>, Russian, Spanish - Spain, Korean<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/17710/header.jpg?t=1526947747",
          "website": "http://www.gameconnect.net/projects",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 199,
            "discount_percent": 80
          },
          "packages": [
            11698,
            11699,
            66789
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 71,
            "url": "https://www.metacritic.com/game/pc/nuclear-dawn?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 27,
              "description": "Cross-Platform Multiplayer"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 8,
              "description": "Valve Anti-Cheat enabled"
            },
            {
              "id": 15,
              "description": "Stats"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 1311
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 26, 2011"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/17710/page_bg_generated_v6b.jpg?t=1526947747",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Tom Clancy's Ghost Recon: Future Soldier™",
          "steam_appid": 212630,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "Join an elite team of special-ops soldiers in the globe’s most deadly warzones to hunt down the highest value targets.",
          "supported_languages": "English<strong>*</strong>, Danish, Dutch, French<strong>*</strong>, German<strong>*</strong>, Italian<strong>*</strong>, Norwegian, Polish, Portuguese - Brazil, Spanish - Spain<strong>*</strong>, Swedish<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/212630/header.jpg?t=1472606318",
          "website": "http://www.ghostrecon.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1999,
            "discount_percent": 0
          },
          "packages": [
            15197,
            15198
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 71,
            "url": "https://www.metacritic.com/game/pc/tom-clancys-ghost-recon-future-soldier?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 2621
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jun 26, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/212630/page_bg_generated_v6b.jpg?t=1472606318",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Endless Space® - Collection",
          "steam_appid": 208140,
          "required_age": 0,
          "is_free": true,
          "controller_support": null,
          "short_description": "Endless Space is a turn-based 4X strategy game, covering the space colonization age in the Endless universe, where you can control every aspect of your civilization as you strive for galactic domination.",
          "supported_languages": "English<strong>*</strong>, French, German, Polish, Italian, Russian, Spanish - Spain<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/208140/header.jpg?t=1533252142",
          "website": "https://www.games2gether.com/endless-space/blogs",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1999,
            "discount_percent": 0
          },
          "packages": [
            149433,
            292317
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": false
          },
          "metacritic": {
            "score": 77,
            "url": "https://www.metacritic.com/game/pc/endless-space?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 36,
              "description": "Online Multi-Player"
            },
            {
              "id": 27,
              "description": "Cross-Platform Multiplayer"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 5578
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jul 4, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/208140/page_bg_generated_v6b.jpg?t=1533252142",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "To the Moon",
          "steam_appid": 206440,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "A story-driven experience about two doctors traversing backwards through a dying man's memories to artificially fulfill his last wish.",
          "supported_languages": "English, French, German, Italian, Russian, Korean, Spanish - Spain, Polish, Portuguese - Brazil, Turkish, Simplified Chinese, Ukrainian",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/206440/header.jpg?t=1530767611",
          "website": "http://www.freebirdgames.com/to_the_moon/",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 499,
            "discount_percent": 50
          },
          "packages": [
            15371,
            15373
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 81,
            "url": "https://www.metacritic.com/game/pc/to-the-moon?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 25,
              "description": "Adventure"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 28568
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 7, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/206440/page_bg_generated_v6b.jpg?t=1530767611",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Alan Wake",
          "steam_appid": 108710,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "A Dark Presence stalks the small town of Bright Falls, pushing Alan Wake to the brink of sanity in his fight to unravel the mystery and save his love.",
          "supported_languages": "English<strong>*</strong>, German<strong>*</strong>, French<strong>*</strong>, Italian<strong>*</strong>, Korean, Spanish - Spain<strong>*</strong>, Russian, Japanese<strong>*</strong>, Polish, Traditional Chinese, Spanish - Latin America<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/108710/header.jpg?t=1540487129",
          "website": "http://www.alanwake.com",
          "price_overview": {
            "currency": "USD",
            "initial": 1499,
            "final": 300,
            "discount_percent": 80
          },
          "packages": [
            13533,
            13535,
            15407
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 83,
            "url": "https://www.metacritic.com/game/pc/alan-wake?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 25,
              "description": "Adventure"
            }
          ],
          "recommendations": {
            "total": 15841
          },
          "release_date": {
            "coming_soon": false,
            "date": "Feb 16, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/108710/page_bg_generated_v6b.jpg?t=1540487129",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Crysis Warhead®",
          "steam_appid": 17330,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "Pulse-racing new installment from 2007's PC Game of the Year*: Play as Sergeant Sykes and experience a whole new side of the battle. A standard combat mission behind enemy lines becomes critical when you discover your enemies have captured something of vital importance to the ensuing war.",
          "supported_languages": "English, French, German, Spanish - Spain, Italian, Czech, Polish, Russian, Hungarian",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/17330/header.jpg?t=1447351452",
          "website": "http://crysiswarhead.ea.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 499,
            "discount_percent": 75
          },
          "packages": [
            984,
            987,
            15609
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 84,
            "url": "https://www.metacritic.com/game/pc/crysis-warhead?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 1709
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 17, 2008"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/17330/page_bg_generated_v6b.jpg?t=1447351452",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Crysis",
          "steam_appid": 17300,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "Adapt to Survive  An epic story thrusts players into an ever-changing environment, forcing them to adapt their tactics and approach to conquer battlefields ranging from newly frozen jungle to zero-gravity alien environments. Suit up!  A high-tech Nanosuit allows gamers to augment their abilities in real time on the battlefield.",
          "supported_languages": "English, French, German, Spanish - Spain, Italian, Czech, Polish, Russian, Hungarian",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/17300/header.jpg?t=1447351450",
          "website": "http://www.ea.com/crysis",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 499,
            "discount_percent": 75
          },
          "packages": [
            980,
            987,
            15609
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 91,
            "url": "https://www.metacritic.com/game/pc/crysis?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 6224
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 17, 2008"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/17300/page_bg_generated_v6b.jpg?t=1447351450",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Crysis Warhead®",
          "steam_appid": 17330,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "Pulse-racing new installment from 2007's PC Game of the Year*: Play as Sergeant Sykes and experience a whole new side of the battle. A standard combat mission behind enemy lines becomes critical when you discover your enemies have captured something of vital importance to the ensuing war.",
          "supported_languages": "English, French, German, Spanish - Spain, Italian, Czech, Polish, Russian, Hungarian",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/17330/header.jpg?t=1447351452",
          "website": "http://crysiswarhead.ea.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 499,
            "discount_percent": 75
          },
          "packages": [
            984,
            987,
            15609
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 84,
            "url": "https://www.metacritic.com/game/pc/crysis-warhead?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 1709
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 17, 2008"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/17330/page_bg_generated_v6b.jpg?t=1447351452",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Alan Wake's American Nightmare",
          "steam_appid": 202750,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "A thrilling new storyline, hordes of creepy enemies, serious firepower and beautiful Arizona locations, combined with a fun and challenging new game mode!",
          "supported_languages": "English<strong>*</strong>, German, French, Italian, Spanish - Spain, Japanese, Czech, Hungarian, Polish, Russian<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/202750/header.jpg?t=1540207470",
          "website": "http://www.alanwake.com",
          "price_overview": {
            "currency": "USD",
            "initial": 899,
            "final": 180,
            "discount_percent": 80
          },
          "packages": [
            14562,
            15407
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 73,
            "url": "https://www.metacritic.com/game/pc/alan-wakes-american-nightmare?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 28,
              "description": "Full controller support"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 25,
              "description": "Adventure"
            }
          ],
          "recommendations": {
            "total": 3306
          },
          "release_date": {
            "coming_soon": false,
            "date": "May 22, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/202750/page_bg_generated_v6b.jpg?t=1540207470",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Crysis 2 - Maximum Edition",
          "steam_appid": 108800,
          "required_age": 16,
          "is_free": false,
          "controller_support": null,
          "short_description": "Aliens are decimating New York City, only you have the technology to survive. Be The Weapon.",
          "supported_languages": "Czech, English, French, German, Italian, Japanese, Polish, Russian, Spanish - Spain, Traditional Chinese, Turkish",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/108800/header.jpg?t=1447355745",
          "website": "http://www.mycrysis.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 2999,
            "final": 749,
            "discount_percent": 75
          },
          "packages": [
            14840,
            15609,
            980,
            984
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": null,
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 4677
          },
          "release_date": {
            "coming_soon": false,
            "date": "Mar 22, 2011"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/108800/page_bg_generated_v6b.jpg?t=1447355745",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Arx Fatalis",
          "steam_appid": 1700,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "This critically acclaimed first-person RPG takes the player on an amazing journey into the fantasy world of Arx. The game mixes intelligent story with immersive and actual medieval surroundings. Arx Fatalis allows the player to feel that all his actions have a direct consequence on those around him.",
          "supported_languages": "English, French, German, Italian, Spanish - Spain, Russian",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/1700/header.jpg?t=1478190772",
          "website": "http://www.arxfatalis-online.com/index_eng.php",
          "price_overview": {
            "currency": "USD",
            "initial": 499,
            "final": 499,
            "discount_percent": 0
          },
          "packages": [
            302
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 77,
            "url": "https://www.metacritic.com/game/pc/arx-fatalis?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            }
          ],
          "genres": [
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 656
          },
          "release_date": {
            "coming_soon": false,
            "date": "Apr 3, 2007"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/1700/page_bg_generated_v6b.jpg?t=1478190772",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Deponia",
          "steam_appid": 214340,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "In Deponia, the world has degenerated into a vast garbage dump, in which the crotchety Rufus ekes out his sorry existence.",
          "supported_languages": "English<strong>*</strong>, German<strong>*</strong>, Russian, French, Polish, Italian<strong>*</strong>, Spanish - Spain<strong>*</strong>, Bulgarian, Greek, Turkish, Czech, Portuguese - Brazil<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/214340/header.jpg?t=1524051764",
          "website": "http://www.deponia.de",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 99,
            "discount_percent": 90
          },
          "packages": [
            15376,
            232463,
            44162,
            55062
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 74,
            "url": "https://www.metacritic.com/game/pc/deponia?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 25,
              "description": "Adventure"
            },
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": {
            "total": 5764
          },
          "release_date": {
            "coming_soon": false,
            "date": "Aug 6, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/214340/page_bg_generated_v6b.jpg?t=1524051764",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Counter-Strike: Global Offensive",
          "steam_appid": 730,
          "required_age": 0,
          "is_free": true,
          "controller_support": "full",
          "short_description": "Counter-Strike: Global Offensive (CS: GO) will expand upon the team-based action gameplay that it pioneered when it was launched 14 years ago. CS: GO features new maps, characters, and weapons and delivers updated versions of the classic CS content (de_dust2, etc.).",
          "supported_languages": "Czech, Danish, Dutch, English<strong>*</strong>, Finnish, French, German, Hungarian, Italian, Japanese, Korean, Norwegian, Polish, Portuguese, Portuguese - Brazil, Romanian, Russian, Simplified Chinese, Spanish - Spain, Swedish, Thai, Traditional Chinese, Turkish, Bulgarian, Ukrainian<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/730/header.jpg?t=1540300672",
          "website": "http://blog.counter-strike.net/",
          "price_overview": {
            "currency": "USD",
            "initial": 1499,
            "final": 1499,
            "discount_percent": 0
          },
          "packages": [
            303386,
            298963,
            54029
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 83,
            "url": "https://www.metacritic.com/game/pc/counter-strike-global-offensive?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 35,
              "description": "In-App Purchases"
            },
            {
              "id": 8,
              "description": "Valve Anti-Cheat enabled"
            },
            {
              "id": 15,
              "description": "Stats"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 1989618
          },
          "release_date": {
            "coming_soon": false,
            "date": "Aug 21, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/730/page_bg_generated_v6b.jpg?t=1540300672",
          "content_descriptors": {
            "ids": [
              2,
              5
            ],
            "notes": "Includes intense violence and blood."
          }
        },
        {
          "type": "game",
          "name": "Dishonored",
          "steam_appid": 205100,
          "required_age": 17,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Dishonored is an immersive first-person action game that casts you as a supernatural assassin driven by revenge. With Dishonored’s flexible combat system, creatively eliminate your targets as you combine the supernatural abilities, weapons and unusual gadgets at your disposal.",
          "supported_languages": "English<strong>*</strong>, German<strong>*</strong>, French<strong>*</strong>, Italian<strong>*</strong>, Spanish - Spain<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/205100/header.jpg?t=1497057346",
          "website": "http://www.dishonored.com",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 999,
            "discount_percent": 0
          },
          "packages": [
            17207,
            31292,
            183039
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 91,
            "url": "https://www.metacritic.com/game/pc/dishonored?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 25,
              "description": "Adventure"
            }
          ],
          "recommendations": {
            "total": 29745
          },
          "release_date": {
            "coming_soon": false,
            "date": "Oct 8, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/205100/page_bg_generated_v6b.jpg?t=1497057346",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Rocketbirds: Hardboiled Chicken",
          "steam_appid": 215510,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Annihilate an evil penguin regime in this cinematic platform adventure game offering full solo and co-op campaigns.",
          "supported_languages": "English<strong>*</strong>, German, French, Italian, Spanish - Spain, Simplified Chinese, Traditional Chinese, Japanese, Portuguese, Dutch, Portuguese - Brazil, Korean<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/215510/header.jpg?t=1485321371",
          "website": "http://www.rocketbirds.com/hardboiledchicken",
          "price_overview": {
            "currency": "USD",
            "initial": 499,
            "final": 99,
            "discount_percent": 80
          },
          "packages": [
            17346
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 74,
            "url": "https://www.metacritic.com/game/pc/rocketbirds-hardboiled-chicken?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 38,
              "description": "Online Co-op"
            },
            {
              "id": 24,
              "description": "Shared/Split Screen"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 25,
              "description": "Adventure"
            },
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": {
            "total": 1527
          },
          "release_date": {
            "coming_soon": false,
            "date": "Oct 15, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/215510/page_bg_generated_v6b.jpg?t=1485321371",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Borderlands 2",
          "steam_appid": 49520,
          "required_age": 17,
          "is_free": false,
          "controller_support": "full",
          "short_description": "The Ultimate Vault Hunter’s Upgrade lets you get the most out of the Borderlands 2 experience.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, German<strong>*</strong>, Italian<strong>*</strong>, Japanese<strong>*</strong>, Spanish - Spain<strong>*</strong>, Korean, Traditional Chinese<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/49520/header.jpg?t=1536253880",
          "website": "http://www.borderlands2.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1999,
            "discount_percent": 0
          },
          "packages": [
            16724,
            16726,
            32848,
            46441
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 89,
            "url": "https://www.metacritic.com/game/pc/borderlands-2?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 85151
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 17, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/49520/page_bg_generated_v6b.jpg?t=1536253880",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "XCOM: Enemy Unknown",
          "steam_appid": 200510,
          "required_age": 17,
          "is_free": false,
          "controller_support": "full",
          "short_description": "The XCOM: Enemy Unknown - Slingshot Pack is Now Available!",
          "supported_languages": "English<strong>*</strong>, German<strong>*</strong>, French<strong>*</strong>, Italian<strong>*</strong>, Korean, Spanish - Spain<strong>*</strong>, Russian<strong>*</strong>, Japanese, Polish<strong>*</strong>, Traditional Chinese<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/200510/header.jpg?t=1537469648",
          "website": "http://www.xcom.com/enemyunknown/",
          "price_overview": {
            "currency": "USD",
            "initial": 2999,
            "final": 749,
            "discount_percent": 75
          },
          "packages": [
            17222,
            37429,
            46437
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 89,
            "url": "https://www.metacritic.com/game/pc/xcom-enemy-unknown?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 27,
              "description": "Cross-Platform Multiplayer"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 24976
          },
          "release_date": {
            "coming_soon": false,
            "date": "Oct 8, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/200510/page_bg_generated_v6b.jpg?t=1537469648",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Mark of the Ninja",
          "steam_appid": 214560,
          "required_age": 17,
          "is_free": false,
          "controller_support": "full",
          "short_description": "In Mark of the Ninja, you'll know what it is to truly be a ninja. You must be silent, agile and clever to outwit your opponents in a world of gorgeous scenery and flowing animation. Marked with cursed tattoos giving you heightened senses, every situation presents you with options.",
          "supported_languages": "English<strong>*</strong>, German, French, Italian, Spanish - Spain, Japanese<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/214560/header.jpg?t=1537892880",
          "website": "http://www.markoftheninja.com",
          "price_overview": null,
          "packages": [
            271120,
            310210
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 91,
            "url": "https://www.metacritic.com/game/pc/mark-of-the-ninja?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 25,
              "description": "Adventure"
            },
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": {
            "total": 11043
          },
          "release_date": {
            "coming_soon": false,
            "date": ""
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/214560/page_bg_generated_v6b.jpg?t=1537892880",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Torchlight II",
          "steam_appid": 200710,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "The adventure continues in Torchlight II! An Action RPG filled with epic battles, bountiful treasure, and a fully randomized world. Bring your friends along for the journey with online and LAN multiplayer.",
          "supported_languages": "English<strong>*</strong>, Japanese<strong>*</strong>, Simplified Chinese<strong>*</strong>, Traditional Chinese<strong>*</strong>, German<strong>*</strong>, Polish<strong>*</strong>, Russian<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/200710/header.jpg?t=1501607860",
          "website": "http://www.torchlight2game.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 399,
            "discount_percent": 80
          },
          "packages": [
            16831,
            2288
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 88,
            "url": "https://www.metacritic.com/game/pc/torchlight-ii?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 27,
              "description": "Cross-Platform Multiplayer"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 25,
              "description": "Adventure"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 21230
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 20, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/200710/page_bg_generated_v6b.jpg?t=1501607860",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Castle Crashers®",
          "steam_appid": 204360,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Hack, slash, and smash your way to victory in this award winning 2D arcade adventure from The Behemoth!",
          "supported_languages": "English<strong>*</strong>, German, French, Italian, Korean, Spanish - Spain, Simplified Chinese, Traditional Chinese, Japanese, Portuguese, Russian<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/204360/header.jpg?t=1530126130",
          "website": "http://www.thebehemoth.com",
          "price_overview": {
            "currency": "USD",
            "initial": 1499,
            "final": 299,
            "discount_percent": 80
          },
          "packages": [
            16675,
            16965,
            43401
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": false
          },
          "metacritic": null,
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 36,
              "description": "Online Multi-Player"
            },
            {
              "id": 37,
              "description": "Local Multi-Player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 38,
              "description": "Online Co-op"
            },
            {
              "id": 39,
              "description": "Local Co-op"
            },
            {
              "id": 24,
              "description": "Shared/Split Screen"
            },
            {
              "id": 27,
              "description": "Cross-Platform Multiplayer"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 25,
              "description": "Adventure"
            },
            {
              "id": 4,
              "description": "Casual"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 35052
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 26, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/204360/page_bg_generated_v6b.jpg?t=1530126130",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Hotline Miami",
          "steam_appid": 219150,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "Hotline Miami is a high-octane action game overflowing with raw brutality, hard-boiled gunplay and skull crushing close combat.",
          "supported_languages": "English, French, German, Spanish - Spain, Portuguese - Brazil, Russian, Polish",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/219150/header.jpg?t=1498680087",
          "website": null,
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 249,
            "discount_percent": 75
          },
          "packages": [
            17111
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 85,
            "url": "https://www.metacritic.com/game/pc/hotline-miami?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": {
            "total": 35878
          },
          "release_date": {
            "coming_soon": false,
            "date": "Oct 23, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/219150/page_bg_generated_v6b.jpg?t=1498680087",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Worms Revolution",
          "steam_appid": 200170,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Worms™ Revolution is the latest game in the classic turn-based strategy series to come to the PC.",
          "supported_languages": "English<strong>*</strong>, German, French, Italian, Spanish - Spain, Polish, Russian, Czech<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/200170/header.jpg?t=1448453014",
          "website": "http://www.team17.com",
          "price_overview": {
            "currency": "USD",
            "initial": 1499,
            "final": 374,
            "discount_percent": 75
          },
          "packages": [
            17226,
            17227,
            31437
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 73,
            "url": "https://www.metacritic.com/game/pc/worms-revolution?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 24,
              "description": "Shared/Split Screen"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            }
          ],
          "genres": [
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 2813
          },
          "release_date": {
            "coming_soon": false,
            "date": "Oct 10, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/200170/page_bg_generated_v6b.jpg?t=1448453014",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Sanctum",
          "steam_appid": 91600,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "You think Tower Defense games are all about building? You thought wrong. Sanctum is not your average Tower Defense title. When the havoc starts, you get to join the fray! As one of the world’s first First Person Shooter - Tower Defense games, Sanctum has taken the best of both worlds to deliver an epic, one-of-a-kind experience.",
          "supported_languages": "English, Danish, French, German, Spanish - Spain, Swedish, Japanese, Polish, Dutch, Italian, Russian, Turkish",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/91600/header.jpg?t=1514905404",
          "website": "http://www.sanctumgame.com",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 249,
            "discount_percent": 75
          },
          "packages": [
            7668,
            8718
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": false
          },
          "metacritic": {
            "score": 70,
            "url": "https://www.metacritic.com/game/pc/sanctum-2011?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 27,
              "description": "Cross-Platform Multiplayer"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 4,
              "description": "Casual"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 1630
          },
          "release_date": {
            "coming_soon": false,
            "date": "Apr 15, 2011"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/91600/page_bg_generated_v6b.jpg?t=1514905404",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Chivalry: Medieval Warfare",
          "steam_appid": 219640,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Besiege castles and raid villages in Chivalry: Medieval Warfare, a fast-paced medieval first person slasher with a focus on multiplayer battles",
          "supported_languages": "English<strong>*</strong>, German, French, Italian, Spanish - Spain, Russian, Polish, Simplified Chinese, Traditional Chinese<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/219640/header.jpg?t=1527266022",
          "website": "http://www.tornbanner.com/chivalry",
          "price_overview": {
            "currency": "USD",
            "initial": 2499,
            "final": 2499,
            "discount_percent": 0
          },
          "packages": [
            17423,
            235870,
            17426,
            30564
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 79,
            "url": "https://www.metacritic.com/game/pc/chivalry-medieval-warfare?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 8,
              "description": "Valve Anti-Cheat enabled"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": {
            "total": 42086
          },
          "release_date": {
            "coming_soon": false,
            "date": "Oct 16, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/219640/page_bg_generated_v6b.jpg?t=1527266022",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        null,
        {
          "type": "game",
          "name": "S.T.A.L.K.E.R.: Shadow of Chernobyl",
          "steam_appid": 4500,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "S.T.A.L.K.E.R.: Shadow of Chernobyl tells a story about survival in the Zone – a very dangerous place, where you fear not only the radiation, anomalies and deadly creatures, but other S.T.A.L.K.E.R.s, who have their own goals and wishes.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, Italian<strong>*</strong>, Spanish - Spain<strong>*</strong>, German<strong>*</strong>, Russian<strong>*</strong>, Ukrainian<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/4500/header.jpg?t=1540832495",
          "website": "http://www.stalker-game.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 599,
            "discount_percent": 70
          },
          "packages": [
            466,
            35983
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 82,
            "url": "https://www.metacritic.com/game/pc/stalker-shadow-of-chernobyl?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 7842
          },
          "release_date": {
            "coming_soon": false,
            "date": "Mar 20, 2007"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/4500/page_bg_generated_v6b.jpg?t=1540832495",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Natural Selection 2",
          "steam_appid": 4920,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "A fast paced multiplayer shooter that pits aliens against humans in a strategic and action-packed struggle for survival!",
          "supported_languages": "English<strong>*</strong>, French, German, Spanish - Spain, Polish, Russian, Finnish, Romanian, Swedish, Czech<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/4920/header.jpg?t=1536154782",
          "website": "http://www.naturalselection2.com",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 249,
            "discount_percent": 75
          },
          "packages": [
            17843,
            16496,
            17844,
            25983
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": true
          },
          "metacritic": {
            "score": 80,
            "url": "https://www.metacritic.com/game/pc/natural-selection-2?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 36,
              "description": "Online Multi-Player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 8,
              "description": "Valve Anti-Cheat enabled"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 6015
          },
          "release_date": {
            "coming_soon": false,
            "date": "Oct 30, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/4920/page_bg_generated_v6b.jpg?t=1536154782",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "POSTAL 2",
          "steam_appid": 223470,
          "required_age": 18,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Live a week in the life of &quot;The Postal Dude&quot;; a hapless everyman just trying to check off some chores. Buying milk, returning an overdue library book, getting Gary Coleman's autograph, what could possibly go wrong?",
          "supported_languages": "English<strong>*</strong>, Russian<strong>*</strong>, Simplified Chinese<strong>*</strong>, Spanish - Spain, Turkish<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/223470/header.jpg?t=1531957471",
          "website": "http://www.runningwithscissors.com",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 99,
            "discount_percent": 90
          },
          "packages": [
            17915,
            18190,
            235346,
            69654
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 59,
            "url": "https://www.metacritic.com/game/pc/postal-2-share-the-pain?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 25,
              "description": "Adventure"
            },
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": {
            "total": 29557
          },
          "release_date": {
            "coming_soon": false,
            "date": "Nov 2, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/223470/page_bg_generated_v6b.jpg?t=1531957471",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Call of Duty®: Black Ops II",
          "steam_appid": 202970,
          "required_age": 17,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Pushing the boundaries of what fans have come to expect from the record-setting entertainment franchise, Call of Duty®: Black Ops II propels players into a near future Cold War",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, German<strong>*</strong>, Italian<strong>*</strong>, Spanish - Spain<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/202970/header.jpg?t=1492633735",
          "website": "http://www.callofduty.com",
          "price_overview": {
            "currency": "USD",
            "initial": 5999,
            "final": 2939,
            "discount_percent": 51
          },
          "packages": [
            18052,
            16361,
            49986,
            49993,
            17569,
            6473
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 74,
            "url": "https://www.metacritic.com/game/pc/call-of-duty-black-ops-ii?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 8,
              "description": "Valve Anti-Cheat enabled"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 8800
          },
          "release_date": {
            "coming_soon": false,
            "date": "Nov 12, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/202970/page_bg_generated_v6b.jpg?t=1492633735",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Call of Duty®: Black Ops II",
          "steam_appid": 202970,
          "required_age": 17,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Pushing the boundaries of what fans have come to expect from the record-setting entertainment franchise, Call of Duty®: Black Ops II propels players into a near future Cold War",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, German<strong>*</strong>, Italian<strong>*</strong>, Spanish - Spain<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/202970/header.jpg?t=1492633735",
          "website": "http://www.callofduty.com",
          "price_overview": {
            "currency": "USD",
            "initial": 5999,
            "final": 2939,
            "discount_percent": 51
          },
          "packages": [
            18052,
            16361,
            49986,
            49993,
            17569,
            6473
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 74,
            "url": "https://www.metacritic.com/game/pc/call-of-duty-black-ops-ii?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 8,
              "description": "Valve Anti-Cheat enabled"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 8800
          },
          "release_date": {
            "coming_soon": false,
            "date": "Nov 12, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/202970/page_bg_generated_v6b.jpg?t=1492633735",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Blade Symphony",
          "steam_appid": 225600,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Prove you are the world's greatest swordsman! Engage in tactical 1 vs. 1 sword fighting, 2 vs. 2, or sandbox FFA, or capture Control Points in a tactical slash-em-up.",
          "supported_languages": "English<strong>*</strong>, Japanese<strong>*</strong>, Russian<strong>*</strong>, German<strong>*</strong>, Spanish - Spain<strong>*</strong>, Dutch<strong>*</strong>, Hungarian<strong>*</strong>, Portuguese<strong>*</strong>, French<strong>*</strong>, Korean<strong>*</strong>, Portuguese - Brazil<strong>*</strong>, Italian<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/225600/header.jpg?t=1540330874",
          "website": "http://www.blade-symphony.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 99,
            "final": 99,
            "discount_percent": 0
          },
          "packages": [
            27252,
            42496,
            43780
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 72,
            "url": "https://www.metacritic.com/game/pc/blade-symphony?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 36,
              "description": "Online Multi-Player"
            },
            {
              "id": 37,
              "description": "Local Multi-Player"
            },
            {
              "id": 27,
              "description": "Cross-Platform Multiplayer"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 35,
              "description": "In-App Purchases"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 15,
              "description": "Stats"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            },
            {
              "id": 16,
              "description": "Includes Source SDK"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": {
            "total": 2792
          },
          "release_date": {
            "coming_soon": false,
            "date": "May 7, 2014"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/225600/page_bg_generated_v6b.jpg?t=1540330874",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Company of Heroes: Tales of Valor",
          "steam_appid": 20540,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "Company of Heroes®: Tales of Valor™ is the expansion to the Game of the Year winner and highest rated real time strategy franchise Company of Heroes®. Featuring new campaigns to overcome, units to command, and battlefields to conquer, Company of Heroes®: Tales of Valor™ delivers evolved gameplay mechanics and 3 episodic adventures...",
          "supported_languages": "English, French, German, Italian, Spanish - Spain",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/20540/header.jpg?t=1521806653",
          "website": "http://www.companyofheroesgame.com",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1999,
            "discount_percent": 0
          },
          "packages": [
            1527,
            1529,
            52874
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 70,
            "url": "https://www.metacritic.com/game/pc/company-of-heroes-tales-of-valor?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 853
          },
          "release_date": {
            "coming_soon": false,
            "date": "Apr 8, 2009"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/20540/page_bg_generated_v6b.jpg?t=1521806653",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "advertising",
          "name": "Call of Duty: Black Ops II - Zombies",
          "steam_appid": 212910,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "",
          "supported_languages": null,
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/212910/header.jpg?t=1447355898",
          "website": null,
          "price_overview": null,
          "packages": null,
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": null,
          "categories": null,
          "genres": null,
          "recommendations": null,
          "release_date": {
            "coming_soon": false,
            "date": ""
          },
          "background": null,
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Company of Heroes: Opposing Fronts",
          "steam_appid": 9340,
          "required_age": 18,
          "is_free": false,
          "controller_support": null,
          "short_description": "The next chapter in the #1 rated RTS franchise thrusts players into a hellish war torn landscape to command two battle-hardened armies in relentless campaigns for honor and country. Players lead the tenacious British 2nd Army during the heroic World War II liberation of Caen, France, and command the German Panzer Elite as they struggle...",
          "supported_languages": "English",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/9340/header.jpg?t=1521806661",
          "website": "http://www.companyofheroesgame.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1999,
            "discount_percent": 0
          },
          "packages": [
            504,
            1529,
            52874
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 87,
            "url": "https://www.metacritic.com/game/pc/company-of-heroes-opposing-fronts?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 373
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 24, 2007"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/9340/page_bg_generated_v6b.jpg?t=1521806661",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Company of Heroes - Legacy Edition",
          "steam_appid": 4560,
          "required_age": 17,
          "is_free": true,
          "controller_support": null,
          "short_description": "Delivering a visceral WWII gaming experience, Company of Heroes redefines RTS by bringing the sacrifice of heroic soldiers, war-ravaged environments, and dynamic battlefields to life. This legacy version also grants access to the latest version of COH, just called &quot;Company of Heroes&quot;.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, Spanish - Spain, Italian, German<strong>*</strong>, Czech, Japanese, Korean, Polish, Russian<strong>*</strong>, Traditional Chinese<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/4560/header.jpg?t=1510112925",
          "website": "http://www.companyofheroesgame.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1999,
            "discount_percent": 0
          },
          "packages": [
            403,
            1529,
            52874
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 93,
            "url": "https://www.metacritic.com/game/pc/company-of-heroes?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 73,
              "description": "Violent"
            },
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 3077
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jul 17, 2007"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/4560/page_bg_generated_v6b.jpg?t=1510112925",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Darksiders™",
          "steam_appid": 50620,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "Deceived by the forces of evil into prematurely bringing about the end of the world, War – the first Horseman of the Apocalypse – stands accused of breaking the sacred law by inciting a war between Heaven and Hell. In the slaughter that ensued, the demonic forces defeated the heavenly hosts and laid claim to the Earth.",
          "supported_languages": "English, French, German, Italian, Spanish - Spain, Czech, Japanese, Polish, Russian",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/50620/header.jpg?t=1531138449",
          "website": "http://www.darksiders.com",
          "price_overview": null,
          "packages": [
            101199,
            81557,
            123985
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 83,
            "url": "https://www.metacritic.com/game/pc/darksiders?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 25,
              "description": "Adventure"
            }
          ],
          "recommendations": {
            "total": 5983
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 23, 2010"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/50620/page_bg_generated_v6b.jpg?t=1531138449",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Mass Effect",
          "steam_appid": 17460,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "As Commander Shepard, you lead an elite squad on a heroic, action-packed adventure throughout the galaxy. Discover the imminent danger from an ancient threat and battle the traitorous Saren and his deadly army to save civilization. The fate of all life depends on your actions!",
          "supported_languages": "English, French, German, Spanish - Spain, Italian",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/17460/header.jpg?t=1447351599",
          "website": "http://masseffect.bioware.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1999,
            "discount_percent": 0
          },
          "packages": [
            1259,
            18260
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 89,
            "url": "https://www.metacritic.com/game/pc/mass-effect?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 9312
          },
          "release_date": {
            "coming_soon": false,
            "date": "Dec 19, 2008"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/17460/page_bg_generated_v6b.jpg?t=1447351599",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Company of Heroes",
          "steam_appid": 228200,
          "required_age": 0,
          "is_free": true,
          "controller_support": null,
          "short_description": "Delivering a visceral WWII gaming experience, Company of Heroes redefines RTS by bringing the sacrifice of heroic soldiers, war-ravaged environments, and dynamic battlefields to life. Please visit the &quot;Company of Heroes - Legacy Edition&quot; page for additional user reviews.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, Italian, German<strong>*</strong>, Spanish - Spain, Czech, Japanese, Korean, Polish, Russian<strong>*</strong>, Traditional Chinese<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/228200/header.jpg?t=1521736892",
          "website": "http://www.companyofheroes.com",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1999,
            "discount_percent": 0
          },
          "packages": [
            403,
            1529,
            52874
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 93,
            "url": "https://www.metacritic.com/game/pc/company-of-heroes?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 73,
              "description": "Violent"
            },
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 1116
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 11, 2006"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/228200/page_bg_generated_v6b.jpg?t=1521736892",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Mass Effect 2",
          "steam_appid": 24980,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "Recruit. Explore. Control.Two years after Commander Shepard repelled invading Reapers bent on the destruction of organic life, a mysterious new enemy has emerged. On the fringes of known space, something is silently abducting entire human colonies.",
          "supported_languages": "English, French, German, Czech, Hungarian, Italian, Polish, Russian, Spanish - Spain",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/24980/header.jpg?t=1447352739",
          "website": "http://masseffect.bioware.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1999,
            "discount_percent": 0
          },
          "packages": [
            2832,
            2833,
            18260
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 94,
            "url": "https://www.metacritic.com/game/pc/mass-effect-2?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            }
          ],
          "genres": [
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 9182
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jan 26, 2010"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/24980/page_bg_generated_v6b.jpg?t=1447352739",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Max Payne 3",
          "steam_appid": 204100,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "No longer a New York City cop, Max Payne moves to São Paulo to protect a wealthy family in an effort to finally escape his troubled past. Combining cutting edge shooting mechanics with a dark and twisted story, Max Payne 3 is a seamless, highly detailed, cinematic experience from Rockstar Games.",
          "supported_languages": "English<strong>*</strong>, French, German, Italian, Russian, Spanish - Spain, Polish, Japanese, Korean, Portuguese - Brazil<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/204100/header.jpg?t=1533709145",
          "website": "http://www.rockstargames.com/maxpayne3",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1999,
            "discount_percent": 0
          },
          "packages": [
            14906,
            18261,
            27273
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": false
          },
          "metacritic": {
            "score": 87,
            "url": "https://www.metacritic.com/game/pc/max-payne-3?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 19872
          },
          "release_date": {
            "coming_soon": false,
            "date": "May 31, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/204100/page_bg_generated_v6b.jpg?t=1533709145",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Darksiders Warmastered Edition",
          "steam_appid": 462780,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Deceived by the forces of evil into prematurely bringing about the end of the world, War – the first Horseman of the Apocalypse – stands accused of breaking the sacred law by inciting a war between Heaven and Hell.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, Italian<strong>*</strong>, German<strong>*</strong>, Spanish - Spain<strong>*</strong>, Japanese<strong>*</strong>, Polish, Russian<strong>*</strong>, Czech, Korean, Portuguese - Brazil, Simplified Chinese<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/462780/header.jpg?t=1536302874",
          "website": null,
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 399,
            "discount_percent": 80
          },
          "packages": [
            101199,
            241375,
            81557,
            123985
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": null,
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 25,
              "description": "Adventure"
            },
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 3637
          },
          "release_date": {
            "coming_soon": false,
            "date": "Nov 29, 2016"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/462780/page_bg_generated_v6b.jpg?t=1536302874",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Super Hexagon",
          "steam_appid": 221640,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Super Hexagon is a minimal action game by Terry Cavanagh, with music by Chipzel.",
          "supported_languages": "English<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/221640/header.jpg?t=1531474399",
          "website": "http://www.superhexagon.com",
          "price_overview": {
            "currency": "USD",
            "initial": 299,
            "final": 200,
            "discount_percent": 33
          },
          "packages": [
            18358,
            18359
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 88,
            "url": "https://www.metacritic.com/game/pc/super-hexagon?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 28,
              "description": "Full controller support"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": {
            "total": 14340
          },
          "release_date": {
            "coming_soon": false,
            "date": "Nov 27, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/221640/page_bg_generated_v6b.jpg?t=1531474399",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Orcs Must Die! 2",
          "steam_appid": 201790,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "You’ve tossed, burned and sliced them by the thousands – now orcs must die more than ever before! Grab a friend and slay orcs in untold numbers in this sequel to the 2011 AIAS Strategy Game of the Year from Robot Entertainment.",
          "supported_languages": "English<strong>*</strong>, German<strong>*</strong>, French<strong>*</strong>, Italian<strong>*</strong>, Spanish - Spain<strong>*</strong>, Russian<strong>*</strong>, Japanese<strong>*</strong>, Polish<strong>*</strong>, Portuguese - Brazil<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/201790/header.jpg?t=1537484731",
          "website": "http://www.robotentertainment.com/games/omd2",
          "price_overview": {
            "currency": "USD",
            "initial": 1499,
            "final": 374,
            "discount_percent": 75
          },
          "packages": [
            15594,
            18202,
            17881
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 83,
            "url": "https://www.metacritic.com/game/pc/orcs-must-die!-2?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 8832
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jul 30, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/201790/page_bg_generated_v6b.jpg?t=1537484731",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Trine 2: Complete Story",
          "steam_appid": 35720,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Three Heroes make their way through dangers untold in a fairytale world, featuring physics-based puzzles, beautiful sights and online co-op.",
          "supported_languages": "English<strong>*</strong>, Finnish, French<strong>*</strong>, German<strong>*</strong>, Italian, Spanish - Spain<strong>*</strong>, Czech, Hungarian, Korean, Portuguese - Brazil, Romanian, Russian, Turkish, Polish, Traditional Chinese<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/35720/header.jpg?t=1539170815",
          "website": "http://www.trine2.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 299,
            "discount_percent": 85
          },
          "packages": [
            28315,
            28316,
            230360,
            28318,
            28377
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 84,
            "url": "https://www.metacritic.com/game/pc/trine-2?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 24,
              "description": "Shared/Split Screen"
            },
            {
              "id": 27,
              "description": "Cross-Platform Multiplayer"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 25,
              "description": "Adventure"
            },
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": {
            "total": 10937
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jun 6, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/35720/page_bg_generated_v6b.jpg?t=1539170815",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Warhammer® 40,000: Dawn of War® - Game of the Year Edition",
          "steam_appid": 4570,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "Prepare yourself for the grim, dark future of the 41st millennium, where alien races battle mankind for galactic domination in a universe of unending war. Personalize your armies with a revolutionary unit customization tool that gives you the ability to choose your armies insignias, banners, squad colors and names.",
          "supported_languages": "English, French, German, Italian, Spanish - Spain",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/4570/header.jpg?t=1528131594",
          "website": "http://www.dawnofwar.com",
          "price_overview": {
            "currency": "USD",
            "initial": 1299,
            "final": 1299,
            "discount_percent": 0
          },
          "packages": [
            18609,
            30560,
            44370,
            116764
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 86,
            "url": "https://www.metacritic.com/game/pc/warhammer-40000-dawn-of-war?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 2212
          },
          "release_date": {
            "coming_soon": false,
            "date": "Aug 7, 2007"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/4570/page_bg_generated_v6b.jpg?t=1528131594",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "APB Reloaded",
          "steam_appid": 113400,
          "required_age": 17,
          "is_free": true,
          "controller_support": null,
          "short_description": "The world’s first and premier Action MMO Third Person Shooter allows you to choose between two sides of the law. Play as Enforcer or Criminal, customize your gear for the task at hand and hit the streets and play how you want in a city filled with more action this side of a Hollywood blockbuster.",
          "supported_languages": "English",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/113400/header.jpg?t=1527784750",
          "website": "http://www.apb.com/",
          "price_overview": null,
          "packages": null,
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": null,
          "categories": [
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 20,
              "description": "MMO"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 37,
              "description": "Free to Play"
            },
            {
              "id": 29,
              "description": "Massively Multiplayer"
            }
          ],
          "recommendations": {
            "total": 441
          },
          "release_date": {
            "coming_soon": false,
            "date": "Dec 6, 2011"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/113400/page_bg_generated_v6b.jpg?t=1527784750",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Antichamber",
          "steam_appid": 219890,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Antichamber is a mind-bending psychological exploration game where nothing can be taken for granted. Discover an Escher-like world where hallways wrap around upon each other, spaces reconfigure themselves, and accomplishing the impossible may just be the only way forward.",
          "supported_languages": "English<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/219890/header.jpg?t=1525832559",
          "website": "http://www.antichamber-game.com",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 799,
            "discount_percent": 60
          },
          "packages": [
            19223
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 82,
            "url": "https://www.metacritic.com/game/pc/antichamber?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            }
          ],
          "genres": [
            {
              "id": 25,
              "description": "Adventure"
            },
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": {
            "total": 8999
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jan 31, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/219890/page_bg_generated_v6b.jpg?t=1525832559",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        null,
        {
          "type": "game",
          "name": "PlanetSide 2",
          "steam_appid": 218230,
          "required_age": 0,
          "is_free": true,
          "controller_support": null,
          "short_description": "Join an all-out planetary war, where thousands of players battle as one in strategic, targeted missions against opposing empires. Utilize infantry, air and ground vehicles to destroy your enemies in this revolutionary, massive scale, first-person shooter.",
          "supported_languages": "English, German, French, Italian, Spanish - Spain",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/218230/header.jpg?t=1512086395",
          "website": "http://www.planetside2.com/",
          "price_overview": null,
          "packages": null,
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 84,
            "url": "https://www.metacritic.com/game/pc/planetside-2?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 20,
              "description": "MMO"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 37,
              "description": "Free to Play"
            },
            {
              "id": 29,
              "description": "Massively Multiplayer"
            }
          ],
          "recommendations": {
            "total": 706
          },
          "release_date": {
            "coming_soon": false,
            "date": "Nov 20, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/218230/page_bg_generated_v6b.jpg?t=1512086395",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Warframe",
          "steam_appid": 230410,
          "required_age": 17,
          "is_free": true,
          "controller_support": null,
          "short_description": "Warframe is a cooperative free-to-play third person online action game set in an evolving sci-fi world.",
          "supported_languages": "English<strong>*</strong>, German, French, Italian, Korean, Spanish - Spain, Simplified Chinese, Russian, Japanese, Polish, Portuguese - Brazil, Traditional Chinese, Turkish, Ukrainian<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/230410/header.jpg?t=1537907871",
          "website": "http://www.warframe.com",
          "price_overview": null,
          "packages": [
            199291
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 71,
            "url": "https://www.metacritic.com/game/pc/warframe?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 35,
              "description": "In-App Purchases"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 37,
              "description": "Free to Play"
            }
          ],
          "recommendations": {
            "total": 3179
          },
          "release_date": {
            "coming_soon": false,
            "date": "Mar 25, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/230410/page_bg_generated_v6b.jpg?t=1537907871",
          "content_descriptors": {
            "ids": [
              2,
              5
            ],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "DCS World Steam Edition",
          "steam_appid": 223750,
          "required_age": 0,
          "is_free": true,
          "controller_support": null,
          "short_description": "Feel the excitement of flying the Su-25T &quot;Frogfoot&quot; attack jet and the TF-51D &quot;Mustang&quot; in the free-to-play Digital Combat Simulator World!DCS World is a vehicle combat simulation game created by an inspired development team. DCS World uses a powerful engine that delivers realistic gameplay.",
          "supported_languages": "English<strong>*</strong>, German, Spanish - Spain, Russian<strong>*</strong>, Czech, French, Simplified Chinese<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/223750/header.jpg?t=1540392926",
          "website": "http://www.digitalcombatsimulator.com/en/",
          "price_overview": null,
          "packages": null,
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": null,
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 13,
              "description": "Captions available"
            },
            {
              "id": 31,
              "description": "VR Support"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            }
          ],
          "genres": [
            {
              "id": 37,
              "description": "Free to Play"
            },
            {
              "id": 28,
              "description": "Simulation"
            }
          ],
          "recommendations": {
            "total": 195
          },
          "release_date": {
            "coming_soon": false,
            "date": "Aug 2, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/223750/page_bg_generated_v6b.jpg?t=1540392926",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Cry of Fear",
          "steam_appid": 223710,
          "required_age": 0,
          "is_free": true,
          "controller_support": null,
          "short_description": "Cry of Fear is a psychological single-player and co-op horror game set in a deserted town filled with horrific creatures and nightmarish delusions. You play as a young man desperately searching for answers in the cold Scandinavian night, finding his way through the city as he slowly descends into madness.",
          "supported_languages": "English<strong>*</strong>, German, French, Spanish - Spain, Dutch, Norwegian, Swedish<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/223710/header.jpg?t=1447356887",
          "website": "http://www.cry-of-fear.com",
          "price_overview": null,
          "packages": null,
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": null,
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 8,
              "description": "Valve Anti-Cheat enabled"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 25,
              "description": "Adventure"
            },
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": {
            "total": 365
          },
          "release_date": {
            "coming_soon": false,
            "date": "Apr 25, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/223710/page_bg_generated_v6b.jpg?t=1447356887",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "War Thunder",
          "steam_appid": 236390,
          "required_age": 0,
          "is_free": true,
          "controller_support": null,
          "short_description": "War Thunder is the most comprehensive free-to-play, cross-platform, MMO military game for Windows, Linux, Mac and PlayStation®4 dedicated to aviation, armoured vehicles, and naval craft from World War II and the Cold War.",
          "supported_languages": "English<strong>*</strong>, German<strong>*</strong>, French<strong>*</strong>, Italian<strong>*</strong>, Spanish - Spain<strong>*</strong>, Simplified Chinese, Russian<strong>*</strong>, Japanese<strong>*</strong>, Polish<strong>*</strong>, Czech<strong>*</strong>, Turkish<strong>*</strong>, Portuguese, Korean, Portuguese - Brazil, Hungarian, Ukrainian<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/236390/header.jpg?t=1540820451",
          "website": "http://warthunder.com/",
          "price_overview": null,
          "packages": null,
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 81,
            "url": "https://www.metacritic.com/game/pc/war-thunder?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 20,
              "description": "MMO"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 27,
              "description": "Cross-Platform Multiplayer"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 35,
              "description": "In-App Purchases"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 37,
              "description": "Free to Play"
            },
            {
              "id": 29,
              "description": "Massively Multiplayer"
            },
            {
              "id": 28,
              "description": "Simulation"
            }
          ],
          "recommendations": {
            "total": 1753
          },
          "release_date": {
            "coming_soon": false,
            "date": "Aug 15, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/236390/page_bg_generated_v6b.jpg?t=1540820451",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Path of Exile",
          "steam_appid": 238960,
          "required_age": 0,
          "is_free": true,
          "controller_support": null,
          "short_description": "You are an Exile, struggling to survive on the dark continent of Wraeclast, as you fight to earn power that will allow you to exact your revenge against those who wronged you. Created by hardcore gamers, Path of Exile is an online Action RPG set in a dark fantasy world.",
          "supported_languages": "English<strong>*</strong>, Portuguese - Brazil, Russian, Thai, French, German, Spanish - Spain<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/238960/header.jpg?t=1535736265",
          "website": "http://www.pathofexile.com",
          "price_overview": null,
          "packages": [
            306042
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 86,
            "url": "https://www.metacritic.com/game/pc/path-of-exile?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 36,
              "description": "Online Multi-Player"
            },
            {
              "id": 20,
              "description": "MMO"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 35,
              "description": "In-App Purchases"
            }
          ],
          "genres": [
            {
              "id": 72,
              "description": "Nudity"
            },
            {
              "id": 73,
              "description": "Violent"
            },
            {
              "id": 74,
              "description": "Gore"
            },
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 25,
              "description": "Adventure"
            },
            {
              "id": 37,
              "description": "Free to Play"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 29,
              "description": "Massively Multiplayer"
            },
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 1171
          },
          "release_date": {
            "coming_soon": false,
            "date": "Oct 23, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/238960/page_bg_generated_v6b.jpg?t=1535736265",
          "content_descriptors": {
            "ids": [
              1,
              2,
              5
            ],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "No More Room in Hell",
          "steam_appid": 224260,
          "required_age": 0,
          "is_free": true,
          "controller_support": null,
          "short_description": "&quot;When there's no more room in hell, the dead will walk the earth.&quot;A tribute to the highly acclaimed film series in which the above quote originated from, No More Room in Hell (PC Gamer's Mod of the Year 2011, ModDB's Editor Choice Multiplayer Mod of the Year 2011), is a co-operative realistic first person survival horror...",
          "supported_languages": "English<strong>*</strong>, German, French, Japanese, Greek, Italian, Spanish - Spain, Hungarian, Russian, Swedish, Traditional Chinese, Ukrainian, Simplified Chinese<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/224260/header.jpg?t=1536391985",
          "website": "https://www.nomoreroominhell.com/",
          "price_overview": null,
          "packages": null,
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": null,
          "categories": [
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 27,
              "description": "Cross-Platform Multiplayer"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 13,
              "description": "Captions available"
            },
            {
              "id": 31,
              "description": "VR Support"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 8,
              "description": "Valve Anti-Cheat enabled"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            },
            {
              "id": 16,
              "description": "Includes Source SDK"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 37,
              "description": "Free to Play"
            },
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": {
            "total": 857
          },
          "release_date": {
            "coming_soon": false,
            "date": "Oct 31, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/224260/page_bg_generated_v6b.jpg?t=1536391985",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Brutal Legend",
          "steam_appid": 225260,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Brütal Legend is an action-adventure that marries visceral action combat with open-world freedom. Set in a universe somewhere between Lord of the Rings and Spinal Tap, it’s a fresh take on the action/driving genre, which in this case is full of imitation cover bands, demons intent on enslaving humanity and Heavy metal tunes.",
          "supported_languages": "English<strong>*</strong>, German, French, Italian, Spanish - Spain<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/225260/header.jpg?t=1479167529",
          "website": "http://www.brutallegend.com",
          "price_overview": {
            "currency": "USD",
            "initial": 1499,
            "final": 374,
            "discount_percent": 75
          },
          "packages": [
            25920,
            25921
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 80,
            "url": "https://www.metacritic.com/game/pc/brutal-legend?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 25,
              "description": "Adventure"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 6794
          },
          "release_date": {
            "coming_soon": false,
            "date": "Feb 26, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/225260/page_bg_generated_v6b.jpg?t=1479167529",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Sniper Elite: Nazi Zombie Army",
          "steam_appid": 227100,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "** Please note: a remastered and improved edition of this game is now available in Zombie Army Trilogy.**Featuring a co-op campaign for 1 to 4 players, Nazi Zombie Army is a horrifying new stand-alone expansion of the award-winning Sniper Elite series.",
          "supported_languages": "English, French, German, Italian, Spanish - Spain, Polish, Russian",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/227100/header.jpg?t=1478604623",
          "website": "http://www.rebellion.co.uk/nza",
          "price_overview": {
            "currency": "USD",
            "initial": 1499,
            "final": 374,
            "discount_percent": 75
          },
          "packages": [
            25560
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 62,
            "url": "https://www.metacritic.com/game/pc/sniper-elite-nazi-zombie-army?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 8,
              "description": "Valve Anti-Cheat enabled"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 2647
          },
          "release_date": {
            "coming_soon": false,
            "date": "Feb 28, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/227100/page_bg_generated_v6b.jpg?t=1478604623",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Age of Empires II HD",
          "steam_appid": 221380,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Age of Empires II has been re-imagined in high definition with new features, trading cards, improved AI, workshop support, multiplayer, Steamworks integration and more!",
          "supported_languages": "English<strong>*</strong>, German<strong>*</strong>, French<strong>*</strong>, Italian<strong>*</strong>, Korean<strong>*</strong>, Spanish - Spain<strong>*</strong>, Simplified Chinese<strong>*</strong>, Russian, Japanese, Dutch, Portuguese - Brazil<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/221380/header.jpg?t=1534437316",
          "website": "http://www.AgeofEmpires.com",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1999,
            "discount_percent": 0
          },
          "packages": [
            50789
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 68,
            "url": "https://www.metacritic.com/game/pc/age-of-empires-ii-hd-edition?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 13,
              "description": "Captions available"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 15,
              "description": "Stats"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            }
          ],
          "genres": [
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 40771
          },
          "release_date": {
            "coming_soon": false,
            "date": "Apr 9, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/221380/page_bg_generated_v6b.jpg?t=1534437316",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Arma 3",
          "steam_appid": 107410,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "Experience true combat gameplay in a massive military sandbox. Deploying a wide variety of single- and multiplayer content, over 20 vehicles and 40 weapons, and limitless opportunities for content creation, this is the PC’s premier military game. Authentic, diverse, open - Arma 3 sends you to war.",
          "supported_languages": "English<strong>*</strong>, French, Italian, German, Spanish - Spain, Czech, Polish, Portuguese - Brazil, Russian, Japanese, Korean, Simplified Chinese, Traditional Chinese, Turkish<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/107410/header.jpg?t=1524502112",
          "website": "http://www.arma3.com",
          "price_overview": {
            "currency": "USD",
            "initial": 3999,
            "final": 1359,
            "discount_percent": 66
          },
          "packages": [
            31539,
            95419,
            45019,
            163922
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 74,
            "url": "http://www.metacritic.com/game/pc/arma-iii?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 36,
              "description": "Online Multi-Player"
            },
            {
              "id": 37,
              "description": "Local Multi-Player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 38,
              "description": "Online Co-op"
            },
            {
              "id": 39,
              "description": "Local Co-op"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 13,
              "description": "Captions available"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 28,
              "description": "Simulation"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 74705
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 12, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/107410/page_bg_generated_v6b.jpg?t=1524502112",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Sniper: Ghost Warrior",
          "steam_appid": 34830,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "As a Ghost Warrior, an elite sniper in a highly trained special ops unit, your unique skills in the art of stalking, target detection, surveillance and shooting accuracy will determine mission success.",
          "supported_languages": "English, French, German, Italian, Polish, Spanish - Spain",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/34830/header.jpg?t=1531733910",
          "website": "http://www.sniperghostwarrior.com",
          "price_overview": {
            "currency": "USD",
            "initial": 799,
            "final": 159,
            "discount_percent": 80
          },
          "packages": [
            11762,
            36904
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 55,
            "url": "https://www.metacritic.com/game/pc/sniper-ghost-warrior?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 1797
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jun 24, 2010"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/34830/page_bg_generated_v6b.jpg?t=1531733910",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Kenshi",
          "steam_appid": 233860,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "A free-roaming squad based RPG. Focusing on open-ended sandbox gameplay features rather than a linear story. Be a trader, a thief, a rebel, a warlord, an adventurer, a farmer, a slave, or just food for the cannibals. Research new equipment and craft new gear.",
          "supported_languages": "English<strong>*</strong>, Spanish - Spain, Portuguese - Brazil<strong>*</strong>, Japanese<strong>*</strong>, German<strong>*</strong>, Russian<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/233860/header.jpg?t=1536668476",
          "website": "http://www.lofigames.com",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1999,
            "discount_percent": 0
          },
          "packages": [
            26224
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": null,
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 3,
              "description": "RPG"
            },
            {
              "id": 28,
              "description": "Simulation"
            },
            {
              "id": 2,
              "description": "Strategy"
            },
            {
              "id": 70,
              "description": "Early Access"
            }
          ],
          "recommendations": {
            "total": 5039
          },
          "release_date": {
            "coming_soon": false,
            "date": "Mar 20, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/233860/page_bg_generated_v6b.jpg?t=1536668476",
          "content_descriptors": {
            "ids": [
              2,
              5
            ],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Prison Architect",
          "steam_appid": 233450,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Build and Manage A Maximum Security Prison.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, Italian<strong>*</strong>, German<strong>*</strong>, Czech<strong>*</strong>, Finnish<strong>*</strong>, Korean<strong>*</strong>, Norwegian<strong>*</strong>, Polish<strong>*</strong>, Portuguese - Brazil<strong>*</strong>, Russian<strong>*</strong>, Simplified Chinese<strong>*</strong>, Spanish - Spain<strong>*</strong>, Bulgarian<strong>*</strong>, Danish<strong>*</strong>, Dutch<strong>*</strong>, Greek<strong>*</strong>, Hungarian<strong>*</strong>, Japanese<strong>*</strong>, Portuguese<strong>*</strong>, Romanian<strong>*</strong>, Swedish<strong>*</strong>, Thai<strong>*</strong>, Traditional Chinese<strong>*</strong>, Turkish<strong>*</strong>, Ukrainian<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/233450/header.jpg?t=1526998781",
          "website": "http://www.introversion.co.uk/prisonarchitect/",
          "price_overview": {
            "currency": "USD",
            "initial": 2999,
            "final": 749,
            "discount_percent": 75
          },
          "packages": [
            26394,
            26395,
            26396,
            26397,
            43954
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 83,
            "url": "https://www.metacritic.com/game/pc/prison-architect?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            }
          ],
          "genres": [
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 28,
              "description": "Simulation"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 26165
          },
          "release_date": {
            "coming_soon": false,
            "date": "Oct 6, 2015"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/233450/page_bg_generated_v6b.jpg?t=1526998781",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Cities in Motion 2",
          "steam_appid": 225420,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Cities in Motion 2 is the sequel to the popular mass transit simulation game Cities in Motion. Build, manage and lead your transportation network to provide cities with their ever changing needs. CIM2 introduces new features including multiplayer game modes, day and night cycles, timetables and dynamic cities.",
          "supported_languages": "English, German",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/225420/header.jpg?t=1447357009",
          "website": "http://www.citiesinmotion2.com",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 499,
            "discount_percent": 75
          },
          "packages": [
            26714,
            35268,
            35269
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 72,
            "url": "https://www.metacritic.com/game/pc/cities-in-motion-2?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 27,
              "description": "Cross-Platform Multiplayer"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            }
          ],
          "genres": [
            {
              "id": 28,
              "description": "Simulation"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 920
          },
          "release_date": {
            "coming_soon": false,
            "date": "Apr 2, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/225420/page_bg_generated_v6b.jpg?t=1447357009",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "DLC Quest",
          "steam_appid": 230050,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "What happens when DLC practices go too far? An indie developer makes a game that mocks the industry and its foibles, that's what! Defeat the bad guy, save the world and get the girl! But first you'll need to find coins to buy DLC to enable animation, sound and even pausing.",
          "supported_languages": "English<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/230050/header.jpg?t=1478022164",
          "website": "http://www.dlcquest.com",
          "price_overview": {
            "currency": "USD",
            "initial": 299,
            "final": 149,
            "discount_percent": 50
          },
          "packages": [
            26380
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": false
          },
          "metacritic": null,
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            }
          ],
          "genres": [
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": {
            "total": 4939
          },
          "release_date": {
            "coming_soon": false,
            "date": "Mar 18, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/230050/page_bg_generated_v6b.jpg?t=1478022164",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Surgeon Simulator",
          "steam_appid": 233720,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Surgeon Simulator is an over-the-top operation sim, stitching together pitch-black humour with life-saving surgery. Become Dr. Burke, a would-be surgeon with a less than conventional toolkit, as he performs procedures on patients including none other than Donald Trump, himself! ...is that a hammer?",
          "supported_languages": "English<strong>*</strong>, French, Italian, German, Spanish - Spain, Danish, Dutch, Finnish, Norwegian, Polish, Portuguese - Brazil, Russian, Swedish<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/233720/header.jpg?t=1526556372",
          "website": "http://www.surgeonsim.com",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 149,
            "discount_percent": 85
          },
          "packages": [
            26827,
            81729
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 71,
            "url": "https://www.metacritic.com/game/pc/surgeon-simulator-2013?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 28,
              "description": "Simulation"
            }
          ],
          "recommendations": {
            "total": 10867
          },
          "release_date": {
            "coming_soon": false,
            "date": "Apr 19, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/233720/page_bg_generated_v6b.jpg?t=1526556372",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        null,
        {
          "type": "game",
          "name": "Poker Night at the Inventory",
          "steam_appid": 31280,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Prepare for a different kind of poker night in a very different kind of club and play against familiar faces!",
          "supported_languages": "English",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/31280/header.jpg?t=1495058773",
          "website": "http://www.telltalegames.com/pokernight",
          "price_overview": {
            "currency": "USD",
            "initial": 499,
            "final": 499,
            "discount_percent": 0
          },
          "packages": [
            6647
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": false
          },
          "metacritic": {
            "score": 71,
            "url": "https://www.metacritic.com/game/pc/poker-night-at-the-inventory?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            }
          ],
          "genres": [
            {
              "id": 4,
              "description": "Casual"
            },
            {
              "id": 18,
              "description": "Sports"
            }
          ],
          "recommendations": {
            "total": 5201
          },
          "release_date": {
            "coming_soon": false,
            "date": "Nov 22, 2010"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/31280/page_bg_generated_v6b.jpg?t=1495058773",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Wargame: Airland Battle",
          "steam_appid": 222750,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "2 SIDES, 12 NATIONS, 750 UNITS: THE STRATEGY GAME REFERENCE IS BACK! Richer, more beautiful and more accessible, Wargame AirLand Battle is the sequel to the explosive real-time strategy game Wargame European Escalation! 1985.",
          "supported_languages": "English, German, French, Italian, Spanish - Spain, Russian, Polish, Traditional Chinese",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/222750/header.jpg?t=1505207837",
          "website": "http://wargame-ab.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1999,
            "discount_percent": 0
          },
          "packages": [
            27202
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 80,
            "url": "https://www.metacritic.com/game/pc/wargame-airland-battle?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 27,
              "description": "Cross-Platform Multiplayer"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 2921
          },
          "release_date": {
            "coming_soon": false,
            "date": "May 29, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/222750/page_bg_generated_v6b.jpg?t=1505207837",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Sanctum 2",
          "steam_appid": 210770,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Sanctum 2 is the sequel to the world’s first Tower Defense/FPS hybrid game. Pick from four unique character classes and embark on a mission to protect the oxygen-producing Cores from hordes of deadly aliens who are threatened by their existence.",
          "supported_languages": "English<strong>*</strong>, German, French, Italian, Spanish - Spain, Russian<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/210770/header.jpg?t=1501885527",
          "website": null,
          "price_overview": {
            "currency": "USD",
            "initial": 1499,
            "final": 374,
            "discount_percent": 75
          },
          "packages": [
            27722,
            27724
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 77,
            "url": "https://www.metacritic.com/game/pc/sanctum-2?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 6436
          },
          "release_date": {
            "coming_soon": false,
            "date": "May 15, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/210770/page_bg_generated_v6b.jpg?t=1501885527",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Don't Starve",
          "steam_appid": 219740,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Don’t Starve is an uncompromising wilderness survival game full of science and magic. Enter a strange and unexplored world full of strange creatures, dangers, and surprises. Gather resources to craft items and structures that match your survival style.",
          "supported_languages": "English<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/219740/header.jpg?t=1505326169",
          "website": "http://www.dontstarvegame.com",
          "price_overview": {
            "currency": "USD",
            "initial": 1499,
            "final": 1499,
            "discount_percent": 0
          },
          "packages": [
            67579
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 79,
            "url": "https://www.metacritic.com/game/pc/dont-starve?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 25,
              "description": "Adventure"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 28,
              "description": "Simulation"
            }
          ],
          "recommendations": {
            "total": 45799
          },
          "release_date": {
            "coming_soon": false,
            "date": ""
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/219740/page_bg_generated_v6b.jpg?t=1505326169",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "FEZ",
          "steam_appid": 224760,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Gomez is a 2D creature living in a 2D world. Or is he? When the existence of a mysterious 3rd dimension is revealed to him, Gomez is sent out on a journey that will take him to the very end of time and space. Use your ability to navigate 3D structures from 4 distinct classic 2D perspectives.",
          "supported_languages": "English, German, French, Italian, Korean, Spanish - Spain, Traditional Chinese, Japanese, Portuguese",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/224760/header.jpg?t=1472521163",
          "website": "http://www.fezgame.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 749,
            "discount_percent": 25
          },
          "packages": [
            27186,
            27436
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 91,
            "url": "https://www.metacritic.com/game/pc/fez?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            }
          ],
          "genres": [
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": {
            "total": 7489
          },
          "release_date": {
            "coming_soon": false,
            "date": "May 1, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/224760/page_bg_generated_v6b.jpg?t=1472521163",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Don't Starve Together",
          "steam_appid": 322330,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Don't Starve Together is the standalone multiplayer expansion of the uncompromising survival game Don't Starve.",
          "supported_languages": "English<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/322330/header.jpg?t=1540592227",
          "website": "http://www.dontstarvegame.com",
          "price_overview": {
            "currency": "USD",
            "initial": 1499,
            "final": 599,
            "discount_percent": 60
          },
          "packages": [
            68179
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 83,
            "url": "https://www.metacritic.com/game/pc/dont-starve-together?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 27,
              "description": "Cross-Platform Multiplayer"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            }
          ],
          "genres": [
            {
              "id": 25,
              "description": "Adventure"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 28,
              "description": "Simulation"
            }
          ],
          "recommendations": {
            "total": 57010
          },
          "release_date": {
            "coming_soon": false,
            "date": "Apr 21, 2016"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/322330/page_bg_generated_v6b.jpg?t=1540592227",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Anomaly 2",
          "steam_appid": 236730,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Anomaly 2 is a sequel to the critically acclaimed Anomaly Warzone Earth. Maintaining the core elements of the original, Anomaly 2 adds plenty of new features: unit morphing, over million tactical combinations, post-apo world and tower defense vs tower offense multiplayer mode.",
          "supported_languages": "English<strong>*</strong>, French, German, Spanish - Spain, Polish, Russian<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/236730/header.jpg?t=1539252885",
          "website": "http://www.anomaly2game.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1499,
            "final": 224,
            "discount_percent": 85
          },
          "packages": [
            27306,
            27388
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 77,
            "url": "https://www.metacritic.com/game/pc/anomaly-2?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 27,
              "description": "Cross-Platform Multiplayer"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 218
          },
          "release_date": {
            "coming_soon": false,
            "date": "May 15, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/236730/page_bg_generated_v6b.jpg?t=1539252885",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Reus",
          "steam_appid": 222730,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "In Reus, you control powerful giants to shape the planet to your will. You can create mountains, oceans, forests and more. Enrich your planet with plants, minerals and animal life. There is only one thing on the planet that you do not control: mankind, with all their virtues and and all their vices.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, Italian<strong>*</strong>, Spanish - Spain<strong>*</strong>, Dutch<strong>*</strong>, Portuguese - Brazil<strong>*</strong>, German<strong>*</strong>, Simplified Chinese<strong>*</strong>, Russian<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/222730/header.jpg?t=1526576195",
          "website": "http://www.reusgame.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 399,
            "discount_percent": 60
          },
          "packages": [
            27693,
            232991
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 75,
            "url": "https://www.metacritic.com/game/pc/reus?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            }
          ],
          "genres": [
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 28,
              "description": "Simulation"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 3461
          },
          "release_date": {
            "coming_soon": false,
            "date": "May 16, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/222730/page_bg_generated_v6b.jpg?t=1526576195",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Kerbal Space Program",
          "steam_appid": 220200,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Kerbal Space Program 1.5: Dressed for Success is now available.With this update both the base game and the expansion are getting their share of enhancements. With that in mind, a key aspect in this update is the optimization and fresh makeover of various parts, as well the improvement of the burn time indicator!",
          "supported_languages": "English, Spanish - Spain, Simplified Chinese, Japanese, Russian, French, Italian, German, Portuguese - Brazil",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/220200/header.jpg?t=1540575521",
          "website": "https://kerbalspaceprogram.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 3999,
            "final": 1599,
            "discount_percent": 60
          },
          "packages": [
            27437
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 88,
            "url": "https://www.metacritic.com/game/pc/kerbal-space-program?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 28,
              "description": "Simulation"
            }
          ],
          "recommendations": {
            "total": 41965
          },
          "release_date": {
            "coming_soon": false,
            "date": "Apr 27, 2015"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/220200/page_bg_generated_v6b.jpg?t=1540575521",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "The Forest",
          "steam_appid": 242760,
          "required_age": 18,
          "is_free": false,
          "controller_support": null,
          "short_description": "As the lone survivor of a passenger jet crash, you find yourself in a mysterious forest battling to stay alive against a society of cannibalistic mutants. Build, explore, survive in this terrifying first person survival horror simulator.",
          "supported_languages": "English<strong>*</strong>, French, German, Czech, Finnish, Japanese, Korean, Polish, Portuguese - Brazil, Russian, Simplified Chinese, Swedish, Traditional Chinese, Turkish, Italian, Spanish - Spain<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/242760/header.jpg?t=1527008565",
          "website": "http://survivetheforest.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1339,
            "discount_percent": 33
          },
          "packages": [
            28497,
            297407
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 83,
            "url": "https://www.metacritic.com/game/pc/the-forest?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 25,
              "description": "Adventure"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 28,
              "description": "Simulation"
            }
          ],
          "recommendations": {
            "total": 88800
          },
          "release_date": {
            "coming_soon": false,
            "date": "Apr 30, 2018"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/242760/page_bg_generated_v6b.jpg?t=1527008565",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "PAYDAY 2",
          "steam_appid": 218620,
          "required_age": 18,
          "is_free": false,
          "controller_support": "full",
          "short_description": "PAYDAY 2 is an action-packed, four-player co-op shooter that once again lets gamers don the masks of the original PAYDAY crew - Dallas, Hoxton, Wolf and Chains - as they descend on Washington DC for an epic crime spree.",
          "supported_languages": "English<strong>*</strong>, German, French, Italian, Spanish - Spain, Dutch, Russian<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/218620/header.jpg?t=1540499986",
          "website": "http://www.overkillsoftware.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 499,
            "discount_percent": 50
          },
          "packages": [
            30182
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": true
          },
          "metacritic": {
            "score": 79,
            "url": "https://www.metacritic.com/game/pc/payday-2?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 38,
              "description": "Online Co-op"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 35,
              "description": "In-App Purchases"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 205141
          },
          "release_date": {
            "coming_soon": false,
            "date": "Aug 13, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/218620/page_bg_generated_v6b.jpg?t=1540499986",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Guncraft",
          "steam_appid": 241720,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Block and Load! Combining the addictive nature of block building sandbox games with the speed and competition of modern first-person shooters, Guncraft takes voxel-based gaming to a whole new level. Players can create maps and arenas based on anything imaginable and, once complete, can utterly destroy them with bullets, bombs, grenades,...",
          "supported_languages": "English, French, Italian, German, Spanish - Spain",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/241720/header.jpg?t=1525801744",
          "website": "http://www.exatogames.com/Guncraft/",
          "price_overview": {
            "currency": "USD",
            "initial": 1499,
            "final": 1499,
            "discount_percent": 0
          },
          "packages": [
            28251,
            30140
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 73,
            "url": "https://www.metacritic.com/game/pc/guncraft?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": {
            "total": 830
          },
          "release_date": {
            "coming_soon": false,
            "date": "Aug 9, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/241720/page_bg_generated_v6b.jpg?t=1525801744",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Sir, You Are Being Hunted",
          "steam_appid": 242880,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Sir, You Are Being Hunted is a freedom sandbox stealth experience, where each playthrough is unique, thanks to our British Countryside Generator. Escape from these robot-infested islands with violence, trickery and stealth. This brutally funny game is available for Windows, OSX, and Linux.",
          "supported_languages": "English<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/242880/header.jpg?t=1447358095",
          "website": "http://www.big-robot.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 399,
            "discount_percent": 80
          },
          "packages": [
            28515
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 63,
            "url": "https://www.metacritic.com/game/pc/sir-you-are-being-hunted?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 15,
              "description": "Stats"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": {
            "total": 2636
          },
          "release_date": {
            "coming_soon": false,
            "date": "May 2, 2014"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/242880/page_bg_generated_v6b.jpg?t=1447358095",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Banished",
          "steam_appid": 242920,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "In this city-building strategy game, you control a group of exiled travelers who decide to restart their lives in a new land. They have only the clothes on their backs and a cart filled with supplies from their homeland. The townspeople of Banished are your primary resource.",
          "supported_languages": "English<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/242920/header.jpg?t=1447358097",
          "website": "http://www.shiningrocksoftware.com",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1999,
            "discount_percent": 0
          },
          "packages": [
            28521
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": null,
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            }
          ],
          "genres": [
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 28,
              "description": "Simulation"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 22952
          },
          "release_date": {
            "coming_soon": false,
            "date": "Feb 18, 2014"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/242920/page_bg_generated_v6b.jpg?t=1447358097",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        null,
        {
          "type": "game",
          "name": "Interstellar Marines",
          "steam_appid": 236370,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "UPDATE 27 AVAILABLE - Interstellar Marines is an immersive tactical sci-fi First Person Simulator in the making, offering a unique blend of tactical gameplay, dynamic environments and non-scriptet AI. Play Singleplayer or Co-op/PvP on servers around the world.",
          "supported_languages": "English<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/236370/header.jpg?t=1516985232",
          "website": "http://www.InterstellarMarines.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 499,
            "discount_percent": 50
          },
          "packages": [
            28453,
            50833,
            28454,
            28455
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": null,
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 27,
              "description": "Cross-Platform Multiplayer"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 15,
              "description": "Stats"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 3,
              "description": "RPG"
            },
            {
              "id": 28,
              "description": "Simulation"
            },
            {
              "id": 70,
              "description": "Early Access"
            }
          ],
          "recommendations": {
            "total": 3786
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jul 2, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/236370/page_bg_generated_v6b.jpg?t=1516985232",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Mercenary Kings: Reloaded Edition",
          "steam_appid": 218820,
          "required_age": 12,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Craft your arsenal to avenge your fallen comrades and save the world from the fearsome forces of CLAW!",
          "supported_languages": "English<strong>*</strong>, French, Japanese<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/218820/header.jpg?t=1517939314",
          "website": "http://mercenarykings.com",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 999,
            "discount_percent": 50
          },
          "packages": [
            29345,
            29347
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 76,
            "url": "https://www.metacritic.com/game/pc/mercenary-kings?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 24,
              "description": "Shared/Split Screen"
            },
            {
              "id": 27,
              "description": "Cross-Platform Multiplayer"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 25,
              "description": "Adventure"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 1046
          },
          "release_date": {
            "coming_soon": false,
            "date": "Mar 25, 2014"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/218820/page_bg_generated_v6b.jpg?t=1517939314",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Medal of Honor™",
          "steam_appid": 47790,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "This is a new war. There is a new warrior. He is Tier 1.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, German<strong>*</strong>, Italian<strong>*</strong>, Spanish - Spain<strong>*</strong>, Polish, Russian, Traditional Chinese<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/47790/header.jpg?t=1447353177",
          "website": "http://www.medalofhonor.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1999,
            "discount_percent": 0
          },
          "packages": [
            8988
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 72,
            "url": "https://www.metacritic.com/game/pc/medal-of-honor?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 1886
          },
          "release_date": {
            "coming_soon": false,
            "date": "Oct 12, 2010"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/47790/page_bg_generated_v6b.jpg?t=1447353177",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Space Engineers",
          "steam_appid": 244850,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Space Engineers is a sandbox game about engineering, construction, exploration and survival in space and on planets. Players build space ships, space stations, planetary outposts of various sizes and uses, pilot ships and travel through space to explore planets and gather resources to survive.",
          "supported_languages": "English, German, Spanish - Spain, Czech, Danish, Dutch, Polish, French, Italian, Finnish, Hungarian, Norwegian, Portuguese - Brazil, Swedish, Russian, Simplified Chinese",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/244850/header.jpg?t=1534347384",
          "website": "http://www.SpaceEngineersGame.com",
          "price_overview": {
            "currency": "USD",
            "initial": 2499,
            "final": 999,
            "discount_percent": 60
          },
          "packages": [
            28952,
            37359,
            59400
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": null,
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 28,
              "description": "Simulation"
            },
            {
              "id": 2,
              "description": "Strategy"
            },
            {
              "id": 70,
              "description": "Early Access"
            }
          ],
          "recommendations": {
            "total": 49084
          },
          "release_date": {
            "coming_soon": false,
            "date": "Oct 23, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/244850/page_bg_generated_v6b.jpg?t=1534347384",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Saints Row IV",
          "steam_appid": 206420,
          "required_age": 17,
          "is_free": false,
          "controller_support": "full",
          "short_description": "The US President must save the Earth from alien overlord Zinyak using an arsenal of superpowers and strange weapons in the wildest open world game ever.",
          "supported_languages": "English<strong>*</strong>, French, German, Italian, Spanish - Spain, Polish, Russian, Japanese<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/206420/header.jpg?t=1533713017",
          "website": "http://www.saintsrow.com",
          "price_overview": {
            "currency": "USD",
            "initial": 1499,
            "final": 1499,
            "discount_percent": 0
          },
          "packages": [
            30397,
            47804
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": true
          },
          "metacritic": {
            "score": 86,
            "url": "https://www.metacritic.com/game/pc/saints-row-iv?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 25,
              "description": "Adventure"
            }
          ],
          "recommendations": {
            "total": 40249
          },
          "release_date": {
            "coming_soon": false,
            "date": "Aug 19, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/206420/page_bg_generated_v6b.jpg?t=1533713017",
          "content_descriptors": {
            "ids": [
              5
            ],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "ENSLAVED™: Odyssey to the West™ Premium Edition",
          "steam_appid": 245280,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Follow a gripping, surprise-filled journey as two dissimilar characters form an uneasy partnership in order to survive through a perilous, post-apocalyptic America. 150 years in the future, war and destruction have left the world in ruins with few humans remaining and nature having reclaimed the world.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, Italian<strong>*</strong>, German<strong>*</strong>, Spanish - Spain<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/245280/header.jpg?t=1485885624",
          "website": "http://enslaved.uk.namcobandaigames.eu/",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1999,
            "discount_percent": 0
          },
          "packages": [
            30287
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 70,
            "url": "https://www.metacritic.com/game/pc/enslaved-odyssey-to-the-west?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 25,
              "description": "Adventure"
            }
          ],
          "recommendations": {
            "total": 2979
          },
          "release_date": {
            "coming_soon": false,
            "date": "Oct 24, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/245280/page_bg_generated_v6b.jpg?t=1485885624",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Medal of Honor™",
          "steam_appid": 47790,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "This is a new war. There is a new warrior. He is Tier 1.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, German<strong>*</strong>, Italian<strong>*</strong>, Spanish - Spain<strong>*</strong>, Polish, Russian, Traditional Chinese<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/47790/header.jpg?t=1447353177",
          "website": "http://www.medalofhonor.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1999,
            "discount_percent": 0
          },
          "packages": [
            8988
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 72,
            "url": "https://www.metacritic.com/game/pc/medal-of-honor?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 1886
          },
          "release_date": {
            "coming_soon": false,
            "date": "Oct 12, 2010"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/47790/page_bg_generated_v6b.jpg?t=1447353177",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Eets Munchies",
          "steam_appid": 214550,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "A beautiful puzzle game for the whole family!Eets Munchies is a reimagining of the award-winning puzzle game by Klei Entertainment. Featuring gorgeous animation and ridiculous creatures, players help an adorable hungry creature devour cake in increasingly devious puzzles.",
          "supported_languages": "English",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/214550/header.jpg?t=1477409200",
          "website": "http://www.eetsgame.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 699,
            "final": 174,
            "discount_percent": 75
          },
          "packages": [
            39965
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": null,
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            }
          ],
          "genres": [
            {
              "id": 4,
              "description": "Casual"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 28,
              "description": "Simulation"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": null,
          "release_date": {
            "coming_soon": false,
            "date": "Mar 11, 2014"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/214550/page_bg_generated_v6b.jpg?t=1477409200",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Jazzpunk: Director's Cut",
          "steam_appid": 250260,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Jazzpunk is a comedy adventure set in an alternate reality Cold War World, plagued with corporate espionage, CyberCrime, and sentient martinis. Gameplay is inspired by spoof comedy films and cartoons of yesteryear, with a focus on weird gadgets, exotic locales, and open-world style exploration.",
          "supported_languages": "English<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/250260/header.jpg?t=1497707920",
          "website": "http://www.jazzpunk.net",
          "price_overview": {
            "currency": "USD",
            "initial": 1499,
            "final": 374,
            "discount_percent": 75
          },
          "packages": [
            30442
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 75,
            "url": "https://www.metacritic.com/game/pc/jazzpunk?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            }
          ],
          "genres": [
            {
              "id": 25,
              "description": "Adventure"
            },
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": {
            "total": 3012
          },
          "release_date": {
            "coming_soon": false,
            "date": "Feb 7, 2014"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/250260/page_bg_generated_v6b.jpg?t=1497707920",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Rust",
          "steam_appid": 252490,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "The only aim in Rust is to survive. To do this you will need to overcome struggles such as hunger, thirst and cold. Build a fire. Build a shelter. Kill animals for meat. Protect yourself from other players, and kill them for meat. Create alliances with other players and form a town. Do whatever it takes to survive.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, Italian<strong>*</strong>, German<strong>*</strong>, Spanish - Spain<strong>*</strong>, Japanese<strong>*</strong>, Korean<strong>*</strong>, Russian<strong>*</strong>, Simplified Chinese<strong>*</strong>, Ukrainian<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/252490/header.jpg?t=1538647482",
          "website": "http://rust.facepunch.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 3499,
            "final": 1749,
            "discount_percent": 50
          },
          "packages": [
            244390
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": false
          },
          "metacritic": {
            "score": 69,
            "url": "https://www.metacritic.com/game/pc/rust?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 36,
              "description": "Online Multi-Player"
            },
            {
              "id": 20,
              "description": "MMO"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 38,
              "description": "Online Co-op"
            },
            {
              "id": 27,
              "description": "Cross-Platform Multiplayer"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 35,
              "description": "In-App Purchases"
            },
            {
              "id": 8,
              "description": "Valve Anti-Cheat enabled"
            },
            {
              "id": 15,
              "description": "Stats"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 25,
              "description": "Adventure"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 29,
              "description": "Massively Multiplayer"
            },
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 185230
          },
          "release_date": {
            "coming_soon": false,
            "date": "Feb 8, 2018"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/252490/page_bg_generated_v6b.jpg?t=1538647482",
          "content_descriptors": {
            "ids": [
              1,
              2,
              5
            ],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Lovers in a Dangerous Spacetime",
          "steam_appid": 252110,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Explore a neon galaxy in your very own battleship in this 1- to 4-player couch co-op adventure.",
          "supported_languages": "English, French, Italian, German, Spanish - Spain, Japanese, Korean, Portuguese - Brazil, Russian, Simplified Chinese, Traditional Chinese",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/252110/header.jpg?t=1488222341",
          "website": "http://www.loversinadangerousspacetime.com",
          "price_overview": {
            "currency": "USD",
            "initial": 1499,
            "final": 749,
            "discount_percent": 50
          },
          "packages": [
            30822
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 80,
            "url": "https://www.metacritic.com/game/pc/lovers-in-a-dangerous-spacetime?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 24,
              "description": "Shared/Split Screen"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 28,
              "description": "Simulation"
            }
          ],
          "recommendations": {
            "total": 1314
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 9, 2015"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/252110/page_bg_generated_v6b.jpg?t=1488222341",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        null,
        {
          "type": "game",
          "name": "PULSAR: Lost Colony",
          "steam_appid": 252870,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Team up to operate an advanced starship and explore a randomized galaxy falling into chaos. Each player (up to five) takes on a unique role and must work together in order to find the Lost Colony.",
          "supported_languages": "English",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/252870/header.jpg?t=1529438003",
          "website": "http://www.pulsarthegame.com",
          "price_overview": {
            "currency": "USD",
            "initial": 2499,
            "final": 1499,
            "discount_percent": 40
          },
          "packages": [
            30936
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": null,
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 38,
              "description": "Online Co-op"
            },
            {
              "id": 27,
              "description": "Cross-Platform Multiplayer"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 25,
              "description": "Adventure"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 28,
              "description": "Simulation"
            },
            {
              "id": 70,
              "description": "Early Access"
            }
          ],
          "recommendations": {
            "total": 1627
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 15, 2015"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/252870/page_bg_generated_v6b.jpg?t=1529438003",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Rocket League®",
          "steam_appid": 252950,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Soccer meets driving once again in the long-awaited, physics-based multiplayer-focused sequel to Supersonic Acrobatic Rocket-Powered Battle-Cars! Choose a variety of high-flying vehicles equipped with huge rocket boosters to score amazing aerial goals and pull-off incredible game-changing saves!",
          "supported_languages": "English, French, Italian, German, Spanish - Spain, Dutch, Portuguese, Japanese, Korean, Russian, Turkish, Polish",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/252950/header_alt_assets_4.jpg?t=1539663459",
          "website": "http://www.rocketleague.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1199,
            "discount_percent": 40
          },
          "packages": [
            30948,
            140146,
            224114
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 86,
            "url": "https://www.metacritic.com/game/pc/rocket-league?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 24,
              "description": "Shared/Split Screen"
            },
            {
              "id": 27,
              "description": "Cross-Platform Multiplayer"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 15,
              "description": "Stats"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 9,
              "description": "Racing"
            },
            {
              "id": 18,
              "description": "Sports"
            }
          ],
          "recommendations": {
            "total": 164038
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jul 7, 2015"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/252950/page_bg_generated_v6b.jpg?t=1539663459",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        null,
        {
          "type": "game",
          "name": "Skullgirls",
          "steam_appid": 245170,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Skullgirls is a fast-paced 2-D fighting game that puts players in control of fierce warriors in an extraordinary Dark Deco world. Featuring all-new game systems which test the skills of veteran fighting game fans while also making the genre enjoyable and accessible to newcomers.",
          "supported_languages": "English<strong>*</strong>, French, Italian, German, Spanish - Spain, Japanese, Portuguese - Brazil<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/245170/header.jpg?t=1516345108",
          "website": "http://www.skullgirls.com",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 299,
            "discount_percent": 70
          },
          "packages": [
            31087,
            31440,
            31446
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 83,
            "url": "https://www.metacritic.com/game/pc/skullgirls?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": {
            "total": 9358
          },
          "release_date": {
            "coming_soon": false,
            "date": "Aug 22, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/245170/page_bg_generated_v6b.jpg?t=1516345108",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        {
          "type": "game",
          "name": "Half-Life 2: Lost Coast",
          "steam_appid": 340,
          "required_age": 0,
          "is_free": true,
          "controller_support": null,
          "short_description": "Originally planned as a section of the Highway 17 chapter of Half-Life 2, Lost Coast is a playable technology showcase that introduces High Dynamic Range lighting to the Source engine.",
          "supported_languages": "English, French, German, Italian, Spanish - Spain, Russian, Simplified Chinese, Traditional Chinese, Korean",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/340/header.jpg?t=1530046348",
          "website": "http://www.half-life2.com",
          "price_overview": null,
          "packages": null,
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": null,
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 14,
              "description": "Commentary available"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 4517
          },
          "release_date": {
            "coming_soon": false,
            "date": "Oct 27, 2005"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/340/page_bg_generated_v6b.jpg?t=1530046348",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Darwinia",
          "steam_appid": 1500,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Combining fast-paced action with strategic battle planning, Darwinia features a novel and intuitive control mechanism, a graphical style ripped from 80's retro classics like Tron and Defender, and a story concerning a tribe of nomadic sprites trapped in a modern 3D world.",
          "supported_languages": "English, German",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/1500/header.jpg?t=1460468361",
          "website": "http://www.darwinia.co.uk/",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 249,
            "discount_percent": 75
          },
          "packages": [
            54,
            14324,
            978,
            14002
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 84,
            "url": "https://www.metacritic.com/game/pc/darwinia?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            }
          ],
          "genres": [
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 396
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jul 14, 2005"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/1500/page_bg_generated_v6b.jpg?t=1460468361",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Uplink",
          "steam_appid": 1510,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "You play an Uplink Agent who makes a living by performing jobs for major corporations. Your tasks involve hacking into rival computer systems, stealing research data, sabotaging other companies, laundering money, erasing evidence, or framing innocent people.",
          "supported_languages": "English",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/1510/header.jpg?t=1478098895",
          "website": "http://www.uplink.co.uk/",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 249,
            "discount_percent": 75
          },
          "packages": [
            112,
            14002
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 75,
            "url": "https://www.metacritic.com/game/pc/uplink-hacker-elite?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            }
          ],
          "genres": [
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 1174
          },
          "release_date": {
            "coming_soon": false,
            "date": "Aug 23, 2006"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/1510/page_bg_generated_v6b.jpg?t=1478098895",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "DEFCON",
          "steam_appid": 1520,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Inspired by the 1983 cult classic film, Wargames, DEFCON superbly evokes the tension, paranoia and suspicion of the Cold War era, playing on the fascinating aspects of psychological gameplay that occur during strategic nuclear warfare. You play a General hidden deep within an underground bunker.",
          "supported_languages": "English, French, German, Italian, Spanish - Spain",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/1520/header.jpg?t=1478098162",
          "website": "http://www.everybody-dies.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 249,
            "discount_percent": 75
          },
          "packages": [
            156,
            14325,
            14002
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 84,
            "url": "https://www.metacritic.com/game/pc/defcon-everybody-dies?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            }
          ],
          "genres": [
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 1720
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 29, 2006"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/1520/page_bg_generated_v6b.jpg?t=1478098162",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Half-Life 2",
          "steam_appid": 220,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "1998. HALF-LIFE sends a shock through the game industry with its combination of pounding action and continuous, immersive storytelling. Valve's debut title wins more than 50 game-of-the-year awards on its way to being named \"Best PC Game Ever\" by PC Gamer, and launches a franchise with more than eight million retail units sold worldwide.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, German<strong>*</strong>, Italian<strong>*</strong>, Korean<strong>*</strong>, Spanish - Spain<strong>*</strong>, Russian<strong>*</strong>, Simplified Chinese, Traditional Chinese, Dutch, Danish, Finnish, Japanese, Norwegian, Polish, Portuguese, Swedish, Thai<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/220/header.jpg?t=1533329234",
          "website": "http://www.half-life2.com",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 999,
            "discount_percent": 0
          },
          "packages": [
            36,
            289444,
            469
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 96,
            "url": "https://www.metacritic.com/game/pc/half-life-2?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 13,
              "description": "Captions available"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 16,
              "description": "Includes Source SDK"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 45900
          },
          "release_date": {
            "coming_soon": false,
            "date": "Nov 16, 2004"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/220/page_bg_generated_v6b.jpg?t=1533329234",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Garry's Mod",
          "steam_appid": 4000,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Garry's Mod is a physics sandbox. There aren't any predefined aims or goals. We give you the tools and leave you to play.",
          "supported_languages": "English<strong>*</strong>, French, Italian, German, Spanish - Spain, Bulgarian, Czech, Danish, Dutch, Finnish, Greek, Hungarian, Japanese, Korean, Norwegian, Polish, Portuguese, Portuguese - Brazil, Russian, Simplified Chinese, Swedish, Thai, Traditional Chinese, Turkish, Ukrainian<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/4000/header.jpg?t=1535986052",
          "website": "http://gmod.facepunch.com",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 499,
            "discount_percent": 50
          },
          "packages": [
            218,
            295508
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": null,
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 27,
              "description": "Cross-Platform Multiplayer"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 13,
              "description": "Captions available"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 8,
              "description": "Valve Anti-Cheat enabled"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            }
          ],
          "genres": [
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 28,
              "description": "Simulation"
            }
          ],
          "recommendations": {
            "total": 285385
          },
          "release_date": {
            "coming_soon": false,
            "date": "Nov 29, 2006"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/4000/page_bg_generated_v6b.jpg?t=1535986052",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "AudioSurf",
          "steam_appid": 12900,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Ride your music. Audiosurf is a music-adapting puzzle racer where you use your own music to create your own experience. The shape, the speed, and the mood of each ride is determined by the song you choose.",
          "supported_languages": "English, Russian",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/12900/header.jpg?t=1478101211",
          "website": "http://www.audio-surf.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 249,
            "discount_percent": 75
          },
          "packages": [
            636
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 85,
            "url": "https://www.metacritic.com/game/pc/audiosurf?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            }
          ],
          "genres": [
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": {
            "total": 7318
          },
          "release_date": {
            "coming_soon": false,
            "date": "Feb 15, 2008"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/12900/page_bg_generated_v6b.jpg?t=1478101211",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Half-Life 2: Deathmatch",
          "steam_appid": 320,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Fast multiplayer action set in the Half-Life 2 universe! HL2's physics adds a new dimension to deathmatch play. Play straight deathmatch or try Combine vs. Resistance teamplay. Toss a toilet at your friend today!",
          "supported_languages": "English",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/320/header.jpg?t=1512752170",
          "website": null,
          "price_overview": {
            "currency": "USD",
            "initial": 499,
            "final": 499,
            "discount_percent": 0
          },
          "packages": [
            39,
            79
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": null,
          "categories": [
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 8,
              "description": "Valve Anti-Cheat enabled"
            },
            {
              "id": 16,
              "description": "Includes Source SDK"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 3839
          },
          "release_date": {
            "coming_soon": false,
            "date": "Nov 1, 2004"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/320/page_bg_generated_v6b.jpg?t=1512752170",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Half-Life 2: Episode Two",
          "steam_appid": 420,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Half-Life&reg; 2: Episode Two is the second in a trilogy of new games created by Valve that extends the award-winning and best-selling Half-Life&reg; adventure. As Dr. Gordon Freeman, you were last seen exiting City 17 with Alyx Vance as the Citadel erupted amidst a storm of unknown proportions.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, German<strong>*</strong>, Russian<strong>*</strong>, Danish, Dutch, Finnish, Italian, Japanese, Korean, Norwegian, Polish, Portuguese, Simplified Chinese, Spanish - Spain<strong>*</strong>, Swedish, Traditional Chinese<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/420/header.jpg?t=1530046627",
          "website": "http://www.whatistheorangebox.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 799,
            "final": 799,
            "discount_percent": 0
          },
          "packages": [
            516,
            469
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 90,
            "url": "https://www.metacritic.com/game/pc/half-life-2-episode-two?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 13,
              "description": "Captions available"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 15,
              "description": "Stats"
            },
            {
              "id": 16,
              "description": "Includes Source SDK"
            },
            {
              "id": 14,
              "description": "Commentary available"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 9889
          },
          "release_date": {
            "coming_soon": false,
            "date": "Oct 10, 2007"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/420/page_bg_generated_v6b.jpg?t=1530046627",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "advertising",
          "name": "Tom Clancy's Ghost Recon Advanced Warfighter® 2",
          "steam_appid": 13510,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Ubisoft's award-winning shooter that was founded on the PC returns with Tom Clancy's Ghost Recon Advanced Warfighter® 2, designed specifically for the PC gamer by GRIN. Building on the foundation of Ghost Recon Advanced Warfighter, the sequel is a near-future warfare masterpiece.",
          "supported_languages": "English, French, Spanish - Spain, Italian, German",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/13510/header.jpg?t=1447351264",
          "website": "http://www.ghostrecon.com/uk/ghostrecon3/index.php",
          "price_overview": null,
          "packages": null,
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 76,
            "url": "https://www.metacritic.com/game/pc/tom-clancys-ghost-recon-advanced-warfighter-2?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 124
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jul 15, 2008"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/13510/page_bg_generated_v6b.jpg?t=1447351264",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Counter-Strike: Source",
          "steam_appid": 240,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Just updated to include player stats, achievements, new scoreboards and more!",
          "supported_languages": "English, French, German, Italian, Japanese, Korean, Spanish - Spain, Russian, Simplified Chinese, Traditional Chinese, Thai, Turkish",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/240/header.jpg?t=1515613564",
          "website": null,
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 999,
            "discount_percent": 0
          },
          "packages": [
            37
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 88,
            "url": "https://www.metacritic.com/game/pc/counter-strike-source?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 27,
              "description": "Cross-Platform Multiplayer"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 8,
              "description": "Valve Anti-Cheat enabled"
            },
            {
              "id": 15,
              "description": "Stats"
            },
            {
              "id": 16,
              "description": "Includes Source SDK"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 41383
          },
          "release_date": {
            "coming_soon": false,
            "date": "Nov 1, 2004"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/240/page_bg_generated_v6b.jpg?t=1515613564",
          "content_descriptors": {
            "ids": [
              2,
              5
            ],
            "notes": "Includes intense violence and blood."
          }
        },
        {
          "type": "game",
          "name": "Tom Clancy's Ghost Recon® Desert Siege™",
          "steam_appid": 13620,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "East Africa, 2009. A 60-year conflict boils over as Ethiopia invades its smaller neighbor Eritrea, threatening the world's most vital shipping lanes in the Red Sea. An elite team of U.S. Army Green Berets, known as the Ghosts, moves in to safeguard the seas and free Eritrea.",
          "supported_languages": "English",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/13620/header.jpg?t=1447351282",
          "website": "http://www.ghostrecon.com/us/product_grds.php",
          "price_overview": {
            "currency": "USD",
            "initial": 499,
            "final": 499,
            "discount_percent": 0
          },
          "packages": [
            861
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 82,
            "url": "https://www.metacritic.com/game/pc/tom-clancys-ghost-recon-desert-siege?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": null,
          "release_date": {
            "coming_soon": false,
            "date": "Jul 15, 2008"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/13620/page_bg_generated_v6b.jpg?t=1447351282",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Tom Clancy's Ghost Recon® Island Thunder™",
          "steam_appid": 13630,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Ghost Recon takes the next step in battlefield realism with Tom Clancy's Ghost Recon&trade;: Island Thunder&trade;. Cuba, 2009: Castro is dead, and the first free Cuban elections in decades are thrown into turmoil by a drug-funded warlord. The Ghosts, an elite team of U.S.",
          "supported_languages": "English",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/13630/header.jpg?t=1447351283",
          "website": "http://www.ghostrecon.com/us/product_grit.php",
          "price_overview": {
            "currency": "USD",
            "initial": 499,
            "final": 499,
            "discount_percent": 0
          },
          "packages": [
            860
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 82,
            "url": "https://www.metacritic.com/game/pc/tom-clancys-ghost-recon-island-thunder?ftag=MCD-06-10aaa1f"
          },
          "categories": null,
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": null,
          "release_date": {
            "coming_soon": false,
            "date": "Jul 15, 2008"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/13630/page_bg_generated_v6b.jpg?t=1447351283",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "advertising",
          "name": "Tom Clancy's Ghost Recon Advanced Warfighter®",
          "steam_appid": 13640,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Combining the advantages of next-generation console technology with future military technologies, Tom Clancy's Ghost Recon Advanced Warfighter® includes many groundbreaking features, including the Cross-Com, a communication device powered by satellite technology, which delivers complete battlefield awareness in the chaos of the Urban warf",
          "supported_languages": "English, French, Spanish - Spain, Italian, German",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/13640/header.jpg?t=1447351266",
          "website": "http://www.ghostrecon.com/us/ghostrecon3/index.php",
          "price_overview": null,
          "packages": null,
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 80,
            "url": "https://www.metacritic.com/game/pc/tom-clancys-ghost-recon-advanced-warfighter?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": null,
          "release_date": {
            "coming_soon": false,
            "date": "Jul 15, 2008"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/13640/page_bg_generated_v6b.jpg?t=1447351266",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Tom Clancy's Ghost Recon®",
          "steam_appid": 15300,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "Eastern Europe, 2008. War has broken out on the borders of Russia and the fate of the world hangs in the balance. That's when the call goes out for the Ghostsan elite handful of specially trained Green Berets, armed with the latest technology and trained to use the deadliest weapons.",
          "supported_languages": "English",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/15300/header.jpg?t=1447351361",
          "website": "http://ghostrecon.us.ubi.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 999,
            "discount_percent": 0
          },
          "packages": [
            859
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 80,
            "url": "https://www.metacritic.com/game/pc/tom-clancys-ghost-recon?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 505
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jul 15, 2008"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/15300/page_bg_generated_v6b.jpg?t=1447351361",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Tom Clancy's Rainbow Six® Vegas",
          "steam_appid": 13540,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "Tom Clancy's Rainbow Six makes its next-generation hardware debut in the most dramatic installment of the renowned first-person shooter franchise to date. Rainbow operatives take to the chaotic streets of Las Vegas as an escalating terrorist siege in 'Sin City' threatens to take world terrorism to new, uncontrollable heights.",
          "supported_languages": "English, French",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/13540/header.jpg?t=1447351261",
          "website": "http://rainbowsixgame.uk.ubi.com/vegas/",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 999,
            "discount_percent": 0
          },
          "packages": [
            701
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 85,
            "url": "http://www.metacritic.com/game/pc/tom-clancys-rainbow-six-vegas"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 391
          },
          "release_date": {
            "coming_soon": false,
            "date": "Apr 9, 2008"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/13540/page_bg_generated_v6b.jpg?t=1447351261",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Multiwinia",
          "steam_appid": 1530,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "&quot;Long ago a computer scientist called Dr Sepulveda created a beautiful digital world existing entirely within a computer network of his own invention. This world was called Darwinia and it was inhabited by a peaceful, law-abiding digital life-form called the Darwinians.",
          "supported_languages": "English, French, Italian, German, Spanish - Spain",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/1530/header.jpg?t=1478098656",
          "website": "http://www.introversion.co.uk/multiwinia/",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 249,
            "discount_percent": 75
          },
          "packages": [
            1002,
            978,
            14002
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": false
          },
          "metacritic": {
            "score": 76,
            "url": "https://www.metacritic.com/game/pc/multiwinia-survival-of-the-flattest?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            }
          ],
          "genres": [
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": {
            "total": 286
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 19, 2008"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/1530/page_bg_generated_v6b.jpg?t=1478098656",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "The Witcher: Enhanced Edition Director's Cut",
          "steam_appid": 20900,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Become The Witcher, Geralt of Rivia, a legendary monster slayer caught in a web of intrigue woven by forces vying for control of the world. Make difficult decisions and live with the consequences in an game that will immerse you in an extraordinary tale like no other.",
          "supported_languages": "English, French, German, Spanish - Spain, Italian, Czech, Russian, Hungarian, Polish, Traditional Chinese (text only)",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/20900/header.jpg?t=1540479246",
          "website": "http://www.thewitcher.com",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 149,
            "discount_percent": 85
          },
          "packages": [
            994,
            303247
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": false
          },
          "metacritic": {
            "score": 86,
            "url": "https://www.metacritic.com/game/pc/the-witcher-enhanced-edition?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 25446
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 19, 2008"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/20900/page_bg_generated_v6b.jpg?t=1540479246",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Tom Clancy's Rainbow Six Lockdown™",
          "steam_appid": 15000,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "Engineered specifically for the PC by Red Storm Entertainment, Rainbow Six returns to deliver the tensest close-quarters battles ever experienced online. In this episode, Rainbow faces independent terrorist threats, tied together by one common element - the Legion virus.",
          "supported_languages": "English",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/15000/header.jpg?t=1447351287",
          "website": null,
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 999,
            "discount_percent": 0
          },
          "packages": [
            732
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 59,
            "url": "https://www.metacritic.com/game/pc/tom-clancys-rainbow-six-lockdown?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 135
          },
          "release_date": {
            "coming_soon": false,
            "date": "May 13, 2008"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/15000/page_bg_generated_v6b.jpg?t=1447351287",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Tom Clancy's Rainbow Six® 3 Gold",
          "steam_appid": 19830,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Raven Shield:Command an elite multinational squad of special operatives against hidden terrorist forces. In Tom Clancy's Rainbow Six 3: Raven Shield, the third installment to the wildly popular Rainbow Six series, Team Rainbow faces the hidden global forces of a new and secretive foe.",
          "supported_languages": "English",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/19830/header.jpg?t=1472142064",
          "website": null,
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 999,
            "discount_percent": 0
          },
          "packages": [
            1013
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 85,
            "url": "https://www.metacritic.com/game/pc/tom-clancys-rainbow-six?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 746
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 25, 2008"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/19830/page_bg_generated_v6b.jpg?t=1472142064",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Tom Clancy's Rainbow Six® Vegas 2",
          "steam_appid": 15120,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "Tom Clancy's Rainbow Six® Vegas 2 - the sequel to the award-winning next-generation first-person shooter - returns to Sin City. Tom Clancy's Rainbow Six Vegas 2 is your last chance to rescue America's sexiest city from an escalating terrorist siege that will force you into heart-pounding action from beginning to end.",
          "supported_languages": "English, French, Italian, German, Spanish - Spain",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/15120/header.jpg?t=1504805365",
          "website": "http://rainbowsixgame.us.ubi.com/home.php",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 999,
            "discount_percent": 0
          },
          "packages": [
            702
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 78,
            "url": "http://www.metacritic.com/game/pc/tom-clancys-rainbow-six-vegas-2"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 2474
          },
          "release_date": {
            "coming_soon": false,
            "date": "Apr 16, 2008"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/15120/page_bg_generated_v6b.jpg?t=1504805365",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Mount & Blade",
          "steam_appid": 22100,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Calradia is a land at war, offering great riches and even greater dangers to adventurers and mercenaries that flock to shed their blood on its soil. With courage and a strong sword, an unknown stranger can make a name as a warrior. Free-form sand-box gameplay.",
          "supported_languages": "English, German, Polish, Simplified Chinese, Traditional Chinese, Czech",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/22100/header.jpg?t=1511533242",
          "website": "http://www.taleworlds.com/en/Games/MountAndBlade",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 399,
            "discount_percent": 60
          },
          "packages": [
            38001,
            50292
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 72,
            "url": "https://www.metacritic.com/game/pc/mount-blade?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            }
          ],
          "genres": [
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 2630
          },
          "release_date": {
            "coming_soon": false,
            "date": "Nov 3, 2008"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/22100/page_bg_generated_v6b.jpg?t=1511533242",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        null,
        {
          "type": "game",
          "name": "Dead Space",
          "steam_appid": 17470,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Only the Dead Survive. A massive deep-space mining ship goes dark after unearthing a strange artifact on a distant planet. Engineer Isaac Clarke embarks on the repair mission, only to uncover a nightmarish blood bath  the ship's crew horribly slaughtered and infected by alien scourge.",
          "supported_languages": "English, French, German, Italian, Spanish - Spain",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/17470/header.jpg?t=1511287106",
          "website": "http://deadspace.ea.com/agegate.aspx?returnURL=/Default.aspx",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 499,
            "discount_percent": 75
          },
          "packages": [
            1290
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 86,
            "url": "https://www.metacritic.com/game/pc/dead-space?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 28,
              "description": "Full controller support"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 6746
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jan 9, 2009"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/17470/page_bg_generated_v6b.jpg?t=1511287106",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Burnout Paradise: The Ultimate Box",
          "steam_appid": 24740,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Download Burnout™ Paradise: The Ultimate Box today. Paradise City is the largest and most dangerous setting yet for the best-selling Burnout series. The massive setting gives players an open-ended world to explore, as they race their vehicles through hundreds of miles of roads and underground passages with more than 70 different cars.",
          "supported_languages": "English",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/24740/header.jpg?t=1450909984",
          "website": "http://www.criteriongames.com/intro.php",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1999,
            "discount_percent": 0
          },
          "packages": [
            1465
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 87,
            "url": "https://www.metacritic.com/game/pc/burnout-paradise-the-ultimate-box?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            }
          ],
          "genres": [
            {
              "id": 9,
              "description": "Racing"
            }
          ],
          "recommendations": {
            "total": 6762
          },
          "release_date": {
            "coming_soon": false,
            "date": "Mar 12, 2009"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/24740/page_bg_generated_v6b.jpg?t=1450909984",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Star Wars: Battlefront 2 (Classic, 2005)",
          "steam_appid": 6060,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Join the rise of Darth Vader’s elite 501st Legion of Stormtroopers as you fight through an all new story-based saga where every action you take impacts the battlefront and, ultimately, the fate of the Star Wars galaxy.",
          "supported_languages": "English<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/6060/header.jpg?t=1524018481",
          "website": "http://www.swbattlefront2.com",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 999,
            "discount_percent": 0
          },
          "packages": [
            1787
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 78,
            "url": "https://www.metacritic.com/game/pc/star-wars-battlefront-ii?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 36,
              "description": "Online Multi-Player"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 25943
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jul 8, 2009"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/6060/page_bg_generated_v6b.jpg?t=1524018481",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "mod",
          "name": "Defence Alliance 2",
          "steam_appid": 35420,
          "required_age": 0,
          "is_free": true,
          "controller_support": null,
          "short_description": "Defence Alliance 2 is a total conversion mod for Killing Floor featuring team based futuristic FPS game play. DA2 blends fast paced action with class based tactics to create an experience that is instantly enjoyable while still offering very deep gameplay.",
          "supported_languages": "English",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/35420/header.jpg?t=1447352644",
          "website": "http://www.defencealliancegame.com",
          "price_overview": null,
          "packages": null,
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": null,
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 19,
              "description": "Mods"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 416
          },
          "release_date": {
            "coming_soon": false,
            "date": "Dec 11, 2009"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/35420/page_bg_generated_v6b.jpg?t=1447352644",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "STAR WARS™ Jedi Knight - Jedi Academy™",
          "steam_appid": 6020,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Forge your weapon and follow the path of the Jedi Jedi Knight: Jedi Academy is the latest installment of the highly acclaimed Jedi Knight series. Take on the role of a new student eager to learn the ways of the Force from Jedi Master Luke Skywalker.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, German<strong>*</strong>, Spanish - Spain<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/6020/header.jpg?t=1489550565",
          "website": "http://www.lucasarts.com",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 999,
            "discount_percent": 0
          },
          "packages": [
            2117
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": false
          },
          "metacritic": {
            "score": 81,
            "url": "https://www.metacritic.com/game/pc/star-wars-jedi-knight-jedi-academy?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 36,
              "description": "Online Multi-Player"
            },
            {
              "id": 37,
              "description": "Local Multi-Player"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 4688
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 16, 2009"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/6020/page_bg_generated_v6b.jpg?t=1489550565",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "STAR WARS™ Jedi Knight II - Jedi Outcast™",
          "steam_appid": 6030,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "The Legacy of Star Wars Dark Forces™ and Star Wars® Jedi Knight lives on in the intense first-person action of Jedi Outcast.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, German<strong>*</strong>, Spanish - Spain, Traditional Chinese<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/6030/header.jpg?t=1489458409",
          "website": "http://www.lucasarts.com",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 999,
            "discount_percent": 0
          },
          "packages": [
            2116
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": false
          },
          "metacritic": {
            "score": 89,
            "url": "https://www.metacritic.com/game/pc/star-wars-jedi-knight-ii-jedi-outcast?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 36,
              "description": "Online Multi-Player"
            },
            {
              "id": 37,
              "description": "Local Multi-Player"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 1782
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 16, 2009"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/6030/page_bg_generated_v6b.jpg?t=1489458409",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Killing Floor",
          "steam_appid": 1250,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "6-player co-op survival horror at its finest! Free updates, free special events and a ridiculous amount of fun!",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, Italian<strong>*</strong>, German<strong>*</strong>, Spanish - Spain<strong>*</strong>, Hungarian, Polish, Russian<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/1250/header.jpg?t=1529340864",
          "website": "http://www.killingfloorthegame.com",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 499,
            "discount_percent": 75
          },
          "packages": [
            1579
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 72,
            "url": "https://www.metacritic.com/game/pc/killing-floor?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 27,
              "description": "Cross-Platform Multiplayer"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 8,
              "description": "Valve Anti-Cheat enabled"
            },
            {
              "id": 15,
              "description": "Stats"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 31059
          },
          "release_date": {
            "coming_soon": false,
            "date": "May 14, 2009"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/1250/page_bg_generated_v6b.jpg?t=1529340864",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "STAR WARS™ Jedi Knight: Dark Forces II",
          "steam_appid": 32380,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Jedi Knight: Dark Forces II picks up where the award-winning Dark Forces™ game left off...with even more features and firepower in dazzling 3D graphics. As Kyle Katarn, you must acquire a lightsaber and learn the ways of the Force to become a Jedi Knight.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, Italian<strong>*</strong>, Spanish - Spain<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/32380/header.jpg?t=1498859353",
          "website": "http://www.lucasarts.com",
          "price_overview": {
            "currency": "USD",
            "initial": 599,
            "final": 599,
            "discount_percent": 0
          },
          "packages": [
            2114
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 91,
            "url": "https://www.metacritic.com/game/pc/star-wars-jedi-knight-dark-forces-ii?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 37,
              "description": "Local Multi-Player"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 841
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 16, 2009"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/32380/page_bg_generated_v6b.jpg?t=1498859353",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "STAR WARS™ Jedi Knight - Mysteries of the Sith™",
          "steam_appid": 32390,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "It is five years after Kyle's victory over the seven dark Jedi. Invading Imperial forces advance upon a quiet Rebel outpost, interrupting Kyle's training of a brave new Jedi, Mara Jade. First introduced in Timothy Zahn's award-winning Star Wars novel, Heir to the Empire, Mara Jade blends her past experiences as a one time smuggler and...",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, Italian<strong>*</strong>, Spanish - Spain<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/32390/header.jpg?t=1498859456",
          "website": "http://www.lucasarts.com",
          "price_overview": {
            "currency": "USD",
            "initial": 299,
            "final": 299,
            "discount_percent": 0
          },
          "packages": [
            2115
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": null,
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 471
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 16, 2009"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/32390/page_bg_generated_v6b.jpg?t=1498859456",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Red Faction Guerrilla Re-Mars-tered",
          "steam_appid": 667720,
          "required_age": 17,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Red Faction: Guerrilla re-defines the limits of destruction-based game-play with a huge open-world, fast-paced guerrilla-style combat, and true physics-based destruction.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, Italian<strong>*</strong>, German<strong>*</strong>, Spanish - Spain<strong>*</strong>, Arabic, Simplified Chinese, Japanese, Polish, Russian<strong>*</strong>, Czech<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/667720/header.jpg?t=1533041495",
          "website": null,
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1999,
            "discount_percent": 0
          },
          "packages": [
            189796,
            15630,
            123985
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": null,
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 36,
              "description": "Online Multi-Player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            }
          ],
          "genres": [
            {
              "id": 74,
              "description": "Gore"
            }
          ],
          "recommendations": {
            "total": 852
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jul 3, 2018"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/667720/page_bg_generated_v6b.jpg?t=1533041495",
          "content_descriptors": {
            "ids": [
              2,
              5
            ],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Red Faction Guerrilla Steam Edition",
          "steam_appid": 20500,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Set 50 years after the climactic events of the original Red Faction, Red Faction: Guerrilla allows players to take the role of an insurgent fighter with the newly re-established Red Faction movement as they battle for liberation from the oppressive Earth Defense Force.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, German<strong>*</strong>, Italian<strong>*</strong>, Spanish - Spain<strong>*</strong>, Czech, Polish, Russian<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/20500/header.jpg?t=1533041577",
          "website": "http://www.redfaction.com",
          "price_overview": null,
          "packages": [
            189796,
            15630,
            123985
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 82,
            "url": "https://www.metacritic.com/game/pc/red-faction-guerrilla?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 5644
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 15, 2009"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/20500/page_bg_generated_v6b.jpg?t=1533041577",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Command & Conquer: Red Alert 3 - Uprising",
          "steam_appid": 24800,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Red Alert 3: Uprising features four new mini-campaigns, giving players a deeper dive into the storyline's of the Soviets, the Allies, the Empire of the Rising Sun and a unique campaign centered on the origins of everyone’s favorite psionic Japanese schoolgirl commando, Yuriko Omega.",
          "supported_languages": "English, Czech, French, German, Hungarian, Italian, Polish, Russian, Spanish - Spain",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/24800/header.jpg?t=1447352543",
          "website": null,
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1999,
            "discount_percent": 0
          },
          "packages": [
            2208
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": null,
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            }
          ],
          "genres": [
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 869
          },
          "release_date": {
            "coming_soon": false,
            "date": "Oct 6, 2009"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/24800/page_bg_generated_v6b.jpg?t=1447352543",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Tropico 3",
          "steam_appid": 23490,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Become the dictator of a remote island during the Cold War. Charm, persuade, intimidate, oppress, or cheat your people to stay in power! Are you a kind and generous leader? A corrupt and ruthless tyrant ruling with an iron fist?",
          "supported_languages": "English, French, German, Italian, Spanish - Spain",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/23490/header.jpg?t=1540579243",
          "website": "http://www.worldoftropico.com",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 999,
            "discount_percent": 0
          },
          "packages": [
            2128,
            6253,
            12169
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 79,
            "url": "https://www.metacritic.com/game/pc/tropico-3?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            }
          ],
          "genres": [
            {
              "id": 28,
              "description": "Simulation"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 582
          },
          "release_date": {
            "coming_soon": false,
            "date": "Oct 20, 2009"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/23490/page_bg_generated_v6b.jpg?t=1540579243",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Gumboy - Crazy Adventures™",
          "steam_appid": 2520,
          "required_age": 0,
          "is_free": true,
          "controller_support": null,
          "short_description": "Gumboy has fun and novel gameplay set in a richly imagined world. With simple game controls, Gumboy lets the player bounce, roll, float, and fly through the world. Additionally, Gumboy can change size, shape and material.",
          "supported_languages": "English, Polish, Russian",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/2520/header.jpg?t=1529320674",
          "website": "http://www.gumboycrazyadventures.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 499,
            "final": 124,
            "discount_percent": 75
          },
          "packages": [
            234
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 69,
            "url": "https://www.metacritic.com/game/pc/gumboy-crazy-adventures?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            }
          ],
          "genres": [
            {
              "id": 4,
              "description": "Casual"
            },
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": null,
          "release_date": {
            "coming_soon": false,
            "date": "Dec 19, 2006"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/2520/page_bg_generated_v6b.jpg?t=1529320674",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Gumboy - Crazy Adventures™",
          "steam_appid": 2520,
          "required_age": 0,
          "is_free": true,
          "controller_support": null,
          "short_description": "Gumboy has fun and novel gameplay set in a richly imagined world. With simple game controls, Gumboy lets the player bounce, roll, float, and fly through the world. Additionally, Gumboy can change size, shape and material.",
          "supported_languages": "English, Polish, Russian",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/2520/header.jpg?t=1529320674",
          "website": "http://www.gumboycrazyadventures.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 499,
            "final": 124,
            "discount_percent": 75
          },
          "packages": [
            234
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 69,
            "url": "https://www.metacritic.com/game/pc/gumboy-crazy-adventures?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            }
          ],
          "genres": [
            {
              "id": 4,
              "description": "Casual"
            },
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": null,
          "release_date": {
            "coming_soon": false,
            "date": "Dec 19, 2006"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/2520/page_bg_generated_v6b.jpg?t=1529320674",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Vigil: Blood Bitterness™",
          "steam_appid": 2570,
          "required_age": 0,
          "is_free": true,
          "controller_support": null,
          "short_description": "Vigil: Blood Bitterness plunges you into the dark and disturbing story of an ancient civilization where you must reveal the secrets of your past and exact revenge on the Evil destroying your universe. Ritualistic killings and blood lust blur the line between your own kind and the Evil you seek to annihilate.",
          "supported_languages": "English",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/2570/header.jpg?t=1472555208",
          "website": null,
          "price_overview": null,
          "packages": null,
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 61,
            "url": "https://www.metacritic.com/game/pc/vigil-blood-bitterness?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            }
          ],
          "genres": [
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 104
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jun 29, 2007"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/2570/page_bg_generated_v6b.jpg?t=1472555208",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "STAR WARS™ - Dark Forces",
          "steam_appid": 32400,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Behind a veil of secrecy the evil Empire is creating a doomsday army - one that, if finished, will become the final cog in the Empire's arsenal of terror and domination. Your Mission? Join the Rebel Alliance's covert operations division, infiltrate the Empire.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, German<strong>*</strong>, Italian<strong>*</strong>, Spanish - Spain<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/32400/header.jpg?t=1521502339",
          "website": "http://www.lucasarts.com",
          "price_overview": {
            "currency": "USD",
            "initial": 599,
            "final": 599,
            "discount_percent": 0
          },
          "packages": [
            2113
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": false
          },
          "metacritic": null,
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 1240
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 16, 2009"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/32400/page_bg_generated_v6b.jpg?t=1521502339",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Obulis",
          "steam_appid": 11330,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Obulis can literally be learned in seconds, but the puzzles will keep you thinking for hours.",
          "supported_languages": "English",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/11330/header.jpg?t=1511314799",
          "website": null,
          "price_overview": {
            "currency": "USD",
            "initial": 499,
            "final": 99,
            "discount_percent": 80
          },
          "packages": [
            1494
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": null,
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            }
          ],
          "genres": [
            {
              "id": 4,
              "description": "Casual"
            },
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": {
            "total": 480
          },
          "release_date": {
            "coming_soon": false,
            "date": "Mar 19, 2009"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/11330/page_bg_generated_v6b.jpg?t=1511314799",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Chains",
          "steam_appid": 11360,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Chains is a challenging puzzle game with a unique feel and distinctive vector graphics style. The object of the game is simple - to link adjacent bubbles of the same color into chains. As you progress through the physics-driven stages it becomes increasingly more challenging and players' speed, strategy and skill will be put to the test.",
          "supported_languages": "English,German,Spanish - Spain,#lang_français",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/11360/header.jpg?t=1479728118",
          "website": "http://www.2dengine.com/chains/",
          "price_overview": {
            "currency": "USD",
            "initial": 499,
            "final": 99,
            "discount_percent": 80
          },
          "packages": [
            1773
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": false
          },
          "metacritic": null,
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            }
          ],
          "genres": [
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": {
            "total": 388
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jul 1, 2009"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/11360/page_bg_generated_v6b.jpg?t=1479728118",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "S.T.A.L.K.E.R.: Call of Pripyat",
          "steam_appid": 41700,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "S.T.A.L.K.E.R.: Call of Pripyat is the direst sequel of the S.T.A.L.K.E.R.: Shadow of Chernobyl. As a Major Alexander Degtyarev you should investigate the crash of the governmental helicopters around the Zone and find out, what happened there.",
          "supported_languages": "German<strong>*</strong>, English<strong>*</strong>, French<strong>*</strong>, Italian<strong>*</strong>, Russian<strong>*</strong>, Spanish - Spain<strong>*</strong>, Ukrainian<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/41700/header.jpg?t=1540831191",
          "website": "http://cop.stalker-game.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 599,
            "discount_percent": 70
          },
          "packages": [
            2884,
            35983
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 80,
            "url": "https://www.metacritic.com/game/pc/stalker-call-of-pripyat?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 7469
          },
          "release_date": {
            "coming_soon": false,
            "date": "Feb 11, 2010"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/41700/page_bg_generated_v6b.jpg?t=1540831191",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Mount & Blade: Warband",
          "steam_appid": 48700,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "In a land torn asunder by incessant warfare, it is time to assemble your own band of hardened warriors and enter the fray. Lead your men into battle, expand your realm, and claim the ultimate prize: the throne of Calradia!",
          "supported_languages": "English, Czech, French, German, Hungarian, Polish, Simplified Chinese, Traditional Chinese, Spanish - Spain, Japanese, Turkish",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/48700/header.jpg?t=1511540397",
          "website": "http://www.taleworlds.com/en/Games/Warband",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 799,
            "discount_percent": 60
          },
          "packages": [
            38004,
            50293,
            50292
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 78,
            "url": "https://www.metacritic.com/game/pc/mount-blade-warband?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 53786
          },
          "release_date": {
            "coming_soon": false,
            "date": "Mar 31, 2010"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/48700/page_bg_generated_v6b.jpg?t=1511540397",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        null,
        {
          "type": "game",
          "name": "Aliens vs. Predator™",
          "steam_appid": 10680,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "Survive, hunt and prey in the deadly jungles and swamps in distinctly new and thrilling first person gameplay.",
          "supported_languages": "English, French, German, Italian, Russian, Spanish - Spain",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/10680/header.jpg?t=1532338834",
          "website": "http://www.sega.com/avp",
          "price_overview": {
            "currency": "USD",
            "initial": 1499,
            "final": 1499,
            "discount_percent": 0
          },
          "packages": [
            2967,
            27828
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 68,
            "url": "https://www.metacritic.com/game/pc/aliens-vs-predator?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 15,
              "description": "Stats"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 6761
          },
          "release_date": {
            "coming_soon": false,
            "date": "Feb 16, 2010"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/10680/page_bg_generated_v6b.jpg?t=1532338834",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Just Cause 2",
          "steam_appid": 8190,
          "required_age": 17,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Dive into an adrenaline-fuelled free-roaming adventure with 400 square miles of rugged terrain and hundreds of weapons and vehicles.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, German<strong>*</strong>, Italian<strong>*</strong>, Spanish - Spain<strong>*</strong>, Polish, Russian<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/8190/header.jpg?t=1530644128",
          "website": "http://www.justcause.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1499,
            "final": 299,
            "discount_percent": 80
          },
          "packages": [
            4097
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 84,
            "url": "https://www.metacritic.com/game/pc/just-cause-2?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 25,
              "description": "Adventure"
            }
          ],
          "recommendations": {
            "total": 26169
          },
          "release_date": {
            "coming_soon": false,
            "date": "Mar 23, 2010"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/8190/page_bg_generated_v6b.jpg?t=1530644128",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        null,
        {
          "type": "game",
          "name": "Arma 2: Operation Arrowhead",
          "steam_appid": 33930,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "Three years after the conflict in Chernarus, portrayed in the original Arma 2, a new flashpoint explodes in the Green Sea Region. Coalition forces led by the US Army are deployed to Takistan to quickly restore peace and prevent further civilian casualties.",
          "supported_languages": "English<strong>*</strong>, Czech, French, Italian, Spanish - Spain, German, Polish, Russian<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/33930/header.jpg?t=1478602186",
          "website": "http://www.arma2.com",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 399,
            "discount_percent": 80
          },
          "packages": [
            4637,
            4639,
            40710,
            8701
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 73,
            "url": "https://www.metacritic.com/game/pc/arma-ii-operation-arrowhead?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 13,
              "description": "Captions available"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 28,
              "description": "Simulation"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 13831
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jun 29, 2010"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/33930/page_bg_generated_v6b.jpg?t=1478602186",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Mirror's Edge™",
          "steam_appid": 17410,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "In a city where information is heavily monitored, agile couriers called Runners transport sensitive data away from prying eyes. In this seemingly utopian paradise, a crime has been committed, your sister has been framed and now you are being hunted.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, German<strong>*</strong>, Italian<strong>*</strong>, Spanish - Spain<strong>*</strong>, Czech, Russian<strong>*</strong>, Polish, Hungarian, Portuguese<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/17410/header.jpg?t=1447351617",
          "website": "http://www.mirrorsedge.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1999,
            "discount_percent": 0
          },
          "packages": [
            1295
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 81,
            "url": "http://www.metacritic.com/game/pc/mirrors-edge-2008?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 25,
              "description": "Adventure"
            }
          ],
          "recommendations": {
            "total": 14220
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jan 14, 2009"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/17410/page_bg_generated_v6b.jpg?t=1447351617",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Arma 2",
          "steam_appid": 33900,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "Building on 10 years of constant engine development, ARMA II boasts the most realistic combat environment in the world. It models real world ballistics &amp; round deflection, materials penetration, features a realtime day/night cycle and dynamic wind, weather and environmental effects.",
          "supported_languages": "English<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/33900/header.jpg?t=1521639563",
          "website": "http://www.arma2.com",
          "price_overview": {
            "currency": "USD",
            "initial": 1299,
            "final": 259,
            "discount_percent": 80
          },
          "packages": [
            1664,
            4639,
            40710,
            8701
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 77,
            "url": "https://www.metacritic.com/game/pc/arma-ii?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 13,
              "description": "Captions available"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 28,
              "description": "Simulation"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 1771
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jun 29, 2009"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/33900/page_bg_generated_v6b.jpg?t=1521639563",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Victoria II",
          "steam_appid": 42960,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Carefully guide your nation from the era of absolute monarchies in the early 19th century, through expansion and colonization, to finally become a truly great power by the dawn of the 20th century. Victoria II is a grand strategy game played during the colonial era of the 19th century, where the player takes control of a country, guiding...",
          "supported_languages": "English, French, German",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/42960/header.jpg?t=1508406259",
          "website": "http://www.victoria2.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 499,
            "discount_percent": 75
          },
          "packages": [
            4958
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 75,
            "url": "https://www.metacritic.com/game/pc/victoria-ii?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            }
          ],
          "genres": [
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 3772
          },
          "release_date": {
            "coming_soon": false,
            "date": "Aug 30, 2010"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/42960/page_bg_generated_v6b.jpg?t=1508406259",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Lost Planet® 2",
          "steam_appid": 45750,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Lost Planet 2, the sequel to Lost Planet™: Extreme Condition, the landmark third-person shooter that sold over 2.3 million units worldwide, is now available on Steam!",
          "supported_languages": "English<strong>*</strong>, French, German, Italian, Spanish - Spain, Japanese, Korean, Polish, Russian<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/45750/header.jpg?t=1540579196",
          "website": "http://www.lostplanetcommunity.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1999,
            "discount_percent": 0
          },
          "packages": [
            6310
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 63,
            "url": "https://www.metacritic.com/game/pc/lost-planet-2?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 25,
              "description": "Adventure"
            }
          ],
          "recommendations": {
            "total": 1155
          },
          "release_date": {
            "coming_soon": false,
            "date": "Oct 15, 2010"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/45750/page_bg_generated_v6b.jpg?t=1540579196",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "MX vs. ATV Reflex",
          "steam_appid": 55140,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Think fast and hang on to your ride as you take independent control of the rider and take the ultimate test of mettle. Dual controls let you tear it up with death-defying tricks and high-flying freestyle action. Fight for traction and dig up the track to leave your mark.",
          "supported_languages": "English, French, German, Italian, Spanish - Spain",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/55140/header.jpg?t=1533041001",
          "website": "http://www.mxvsatv.com",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1999,
            "discount_percent": 0
          },
          "packages": [
            6727,
            241406,
            123985
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": null,
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 9,
              "description": "Racing"
            }
          ],
          "recommendations": {
            "total": 1255
          },
          "release_date": {
            "coming_soon": false,
            "date": "Nov 26, 2010"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/55140/page_bg_generated_v6b.jpg?t=1533041001",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Magicka",
          "steam_appid": 42910,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Magicka is a satirical action-adventure game set in a rich fantasy world based on Norse mythology. The player assumes the role of a wizard from a sacred order tasked with stopping an evil sorcerer who has thrown the world into turmoil, his foul creations besieging the forces of good.",
          "supported_languages": "English, Russian, French, German, Italian, Polish, Spanish - Spain",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/42910/header.jpg?t=1530639178",
          "website": "http://www.magickagame.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 249,
            "discount_percent": 75
          },
          "packages": [
            7254
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 74,
            "url": "https://www.metacritic.com/game/pc/magicka?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 24,
              "description": "Shared/Split Screen"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 12480
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jan 25, 2011"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/42910/page_bg_generated_v6b.jpg?t=1530639178",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Portal",
          "steam_appid": 400,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Portal&trade; is a new single player game from Valve. Set in the mysterious Aperture Science Laboratories, Portal has been called one of the most innovative new games on the horizon and will offer gamers hours of unique gameplay.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, German<strong>*</strong>, Russian<strong>*</strong>, Danish, Dutch, Finnish, Italian, Japanese, Norwegian, Polish, Portuguese, Simplified Chinese, Spanish - Spain<strong>*</strong>, Swedish, Traditional Chinese<strong>*</strong>, Korean<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/400/header.jpg?t=1512752294",
          "website": "http://www.whatistheorangebox.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 999,
            "discount_percent": 0
          },
          "packages": [
            515,
            204527,
            469
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 90,
            "url": "https://www.metacritic.com/game/pc/portal?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 13,
              "description": "Captions available"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            },
            {
              "id": 16,
              "description": "Includes Source SDK"
            },
            {
              "id": 14,
              "description": "Commentary available"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 36847
          },
          "release_date": {
            "coming_soon": false,
            "date": "Oct 10, 2007"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/400/page_bg_generated_v6b.jpg?t=1512752294",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Cities in Motion",
          "steam_appid": 73010,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Manage transportation for commuters in four of the world's greatest cities - Vienna, Helsinki, Berlin, and Amsterdam",
          "supported_languages": "English, German, Spanish - Spain, French",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/73010/header.jpg?t=1447353921",
          "website": "http://www.citiesinmotion.com",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 499,
            "discount_percent": 75
          },
          "packages": [
            7420,
            29078,
            35269,
            29532
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 70,
            "url": "https://www.metacritic.com/game/pc/cities-in-motion?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            }
          ],
          "genres": [
            {
              "id": 28,
              "description": "Simulation"
            }
          ],
          "recommendations": {
            "total": 477
          },
          "release_date": {
            "coming_soon": false,
            "date": "Feb 22, 2011"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/73010/page_bg_generated_v6b.jpg?t=1447353921",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Portal 2",
          "steam_appid": 620,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "The &quot;Perpetual Testing Initiative&quot; has been expanded to allow you to design co-op puzzles for you and your friends!",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, German<strong>*</strong>, Spanish - Spain<strong>*</strong>, Czech, Danish, Dutch, Finnish, Hungarian, Italian, Japanese, Korean, Norwegian, Polish, Portuguese, Romanian, Russian<strong>*</strong>, Simplified Chinese, Swedish, Thai, Traditional Chinese, Turkish<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/620/header.jpg?t=1512411524",
          "website": "http://www.thinkwithportals.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 999,
            "discount_percent": 0
          },
          "packages": [
            7877,
            204528,
            8187
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 95,
            "url": "https://www.metacritic.com/game/pc/portal-2?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 13,
              "description": "Captions available"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 15,
              "description": "Stats"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            },
            {
              "id": 14,
              "description": "Commentary available"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 25,
              "description": "Adventure"
            }
          ],
          "recommendations": {
            "total": 93258
          },
          "release_date": {
            "coming_soon": false,
            "date": "Apr 18, 2011"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/620/page_bg_generated_v6b.jpg?t=1512411524",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Red Faction®: Armageddon™",
          "steam_appid": 55110,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "Red Faction: Armageddon Path to War includes 4 new missions, 2 unlockable items and 10 new achievements!",
          "supported_languages": "English, French, German, Italian, Polish, Russian, Spanish - Spain",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/55110/header.jpg?t=1533041444",
          "website": "http://www.redfaction.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1999,
            "discount_percent": 0
          },
          "packages": [
            8392,
            241419,
            15630,
            123985
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 75,
            "url": "https://www.metacritic.com/game/pc/red-faction-armageddon?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 8,
              "description": "Valve Anti-Cheat enabled"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 1718
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jun 6, 2011"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/55110/page_bg_generated_v6b.jpg?t=1533041444",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Universe Sandbox",
          "steam_appid": 72200,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Create and destroy on a scale you’ve never imagined!",
          "supported_languages": "English",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/72200/header.jpg?t=1478131333",
          "website": "http://universesandbox.com/",
          "price_overview": null,
          "packages": null,
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 83,
            "url": "https://www.metacritic.com/game/pc/universe-sandbox?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 15,
              "description": "Stats"
            }
          ],
          "genres": [
            {
              "id": 4,
              "description": "Casual"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 28,
              "description": "Simulation"
            }
          ],
          "recommendations": {
            "total": 2178
          },
          "release_date": {
            "coming_soon": false,
            "date": "Apr 29, 2011"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/72200/page_bg_generated_v6b.jpg?t=1478131333",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Beat Hazard",
          "steam_appid": 49600,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Experience your music collection like never before with this intense music driven arcade shooter. Each of your songs will have its own unique ebb and flow based on the music.",
          "supported_languages": "English, French, German, Italian, Spanish - Spain, Dutch",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/49600/header.jpg?t=1508321478",
          "website": "http://www.coldbeamgames.com",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 199,
            "discount_percent": 80
          },
          "packages": [
            4155
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 70,
            "url": "https://www.metacritic.com/game/pc/beat-hazard?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 24,
              "description": "Shared/Split Screen"
            },
            {
              "id": 27,
              "description": "Cross-Platform Multiplayer"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 4,
              "description": "Casual"
            },
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": {
            "total": 4420
          },
          "release_date": {
            "coming_soon": false,
            "date": "Apr 15, 2010"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/49600/page_bg_generated_v6b.jpg?t=1508321478",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Terraria",
          "steam_appid": 105600,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Dig, fight, explore, build! Nothing is impossible in this action-packed adventure game. Four Pack also available!",
          "supported_languages": "English, French, Italian, German, Spanish - Spain, Polish, Portuguese - Brazil, Russian, Simplified Chinese",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/105600/header.jpg?t=1529004887",
          "website": "http://www.terraria.org/",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 499,
            "discount_percent": 50
          },
          "packages": [
            8183,
            8184
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 83,
            "url": "https://www.metacritic.com/game/pc/terraria?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 36,
              "description": "Online Multi-Player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 38,
              "description": "Online Co-op"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 25,
              "description": "Adventure"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 178434
          },
          "release_date": {
            "coming_soon": false,
            "date": "May 16, 2011"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/105600/page_bg_generated_v6b.jpg?t=1529004887",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "The Witcher 2: Assassins of Kings Enhanced Edition",
          "steam_appid": 20920,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "A time of untold chaos has come. Mighty forces clash behind the scenes in a struggle for power and influence. The Northern Kingdoms mobilize for war. But armies on the march are not enough to stop a bloody conspiracy.",
          "supported_languages": "English<strong>*</strong>, German<strong>*</strong>, French<strong>*</strong>, Spanish - Spain, Russian<strong>*</strong>, Czech, Hungarian, Japanese, Polish<strong>*</strong>, Turkish, Traditional Chinese, Italian<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/20920/header.jpg?t=1540479596",
          "website": "http://www.thewitcher.com",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 299,
            "discount_percent": 85
          },
          "packages": [
            8186,
            303246
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 88,
            "url": "https://www.metacritic.com/game/pc/the-witcher-2-assassins-of-kings?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            }
          ],
          "genres": [
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 32762
          },
          "release_date": {
            "coming_soon": false,
            "date": "Apr 16, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/20920/page_bg_generated_v6b.jpg?t=1540479596",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Solar 2",
          "steam_appid": 97000,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Dynamic abstract sandbox universe. Changes and evolves as you do.",
          "supported_languages": "English",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/97000/header.jpg?t=1447354312",
          "website": "http://murudai.com/solar/",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 999,
            "discount_percent": 0
          },
          "packages": [
            8535
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 72,
            "url": "https://www.metacritic.com/game/pc/solar-2?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 15,
              "description": "Stats"
            }
          ],
          "genres": [
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 4,
              "description": "Casual"
            }
          ],
          "recommendations": {
            "total": 1102
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jun 17, 2011"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/97000/page_bg_generated_v6b.jpg?t=1447354312",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Warhammer 40,000: Space Marine",
          "steam_appid": 55150,
          "required_age": 17,
          "is_free": false,
          "controller_support": "full",
          "short_description": "In Warhammer® 40,000® Space Marine® you are Captain Titus, a Space Marine of the Ultramarines chapter and a seasoned veteran of countless battles.",
          "supported_languages": "English, French, German, Italian, Spanish - Spain, Russian<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/55150/header.jpg?t=1528131586",
          "website": "http://www.spacemarine.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 2999,
            "final": 2999,
            "discount_percent": 0
          },
          "packages": [
            11443,
            15351,
            116764
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 74,
            "url": "https://www.metacritic.com/game/pc/warhammer-40000-space-marine?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 4806
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 5, 2011"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/55150/page_bg_generated_v6b.jpg?t=1528131586",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        null,
        {
          "type": "game",
          "name": "The Elder Scrolls V: Skyrim",
          "steam_appid": 72850,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "EPIC FANTASY REBORN The next chapter in the highly anticipated Elder Scrolls saga arrives from the makers of the 2006 and 2008 Games of the Year, Bethesda Game Studios. Skyrim reimagines and revolutionizes the open-world fantasy epic, bringing to life a complete virtual world open for you to explore any way you choose.",
          "supported_languages": "English, French, German, Italian, Spanish - Spain, Japanese, Czech, Polish, Russian",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/72850/header.jpg?t=1493767797",
          "website": "http://elderscrolls.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1999,
            "discount_percent": 0
          },
          "packages": [
            12248
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 94,
            "url": "https://www.metacritic.com/game/pc/the-elder-scrolls-v-skyrim?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 152523
          },
          "release_date": {
            "coming_soon": false,
            "date": "Nov 10, 2011"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/72850/page_bg_generated_v6b.jpg?t=1493767797",
          "content_descriptors": {
            "ids": [
              5
            ],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "PAYDAY™ The Heist",
          "steam_appid": 24240,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "Take on the role of a hardened career criminal executing intense, dynamic heists in constant pursuit of the next “big score”",
          "supported_languages": "English<strong>*</strong>, French, German, Italian, Spanish - Spain<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/24240/header.jpg?t=1516099628",
          "website": "http://www.overkillsoftware.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1499,
            "final": 1499,
            "discount_percent": 0
          },
          "packages": [
            11675
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 76,
            "url": "https://www.metacritic.com/game/pc/payday-the-heist?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 15,
              "description": "Stats"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 18134
          },
          "release_date": {
            "coming_soon": false,
            "date": "Oct 20, 2011"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/24240/page_bg_generated_v6b.jpg?t=1516099628",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Tropico 4",
          "steam_appid": 57690,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "The world is changing and Tropico is moving with the times - geographical powers rise and fall and the world market is dominated by new players with new demands and offers - and you, as El Presidente, face a whole new set of challenges.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, German<strong>*</strong>, Italian<strong>*</strong>, Spanish - Spain<strong>*</strong>, Korean<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/57690/header.jpg?t=1535973552",
          "website": "http://www.worldoftropico.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1499,
            "final": 1499,
            "discount_percent": 0
          },
          "packages": [
            11400,
            19282
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": false
          },
          "metacritic": {
            "score": 78,
            "url": "https://www.metacritic.com/game/pc/tropico-4?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            }
          ],
          "genres": [
            {
              "id": 28,
              "description": "Simulation"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 5986
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 1, 2011"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/57690/page_bg_generated_v6b.jpg?t=1535973552",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Red Orchestra 2: Heroes of Stalingrad with Rising Storm",
          "steam_appid": 35450,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "Contains full Rising Storm content as well!",
          "supported_languages": "English<strong>*</strong>, French, German<strong>*</strong>, Russian<strong>*</strong>, Polish<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/35450/header.jpg?t=1529341005",
          "website": "http://www.heroesofstalingrad.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1999,
            "discount_percent": 0
          },
          "packages": [
            61255,
            61257,
            11412
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 76,
            "url": "https://www.metacritic.com/game/pc/red-orchestra-2-heroes-of-stalingrad?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 36,
              "description": "Online Multi-Player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 8,
              "description": "Valve Anti-Cheat enabled"
            },
            {
              "id": 15,
              "description": "Stats"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 29,
              "description": "Massively Multiplayer"
            },
            {
              "id": 28,
              "description": "Simulation"
            }
          ],
          "recommendations": {
            "total": 17483
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 13, 2011"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/35450/page_bg_generated_v6b.jpg?t=1529341005",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "The Binding of Isaac",
          "steam_appid": 113200,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Now 20% More Evil with the Free Halloween update!",
          "supported_languages": "English<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/113200/header.jpg?t=1447354527",
          "website": null,
          "price_overview": {
            "currency": "USD",
            "initial": 499,
            "final": 499,
            "discount_percent": 0
          },
          "packages": [
            11734,
            15408
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": false
          },
          "metacritic": {
            "score": 84,
            "url": "https://www.metacritic.com/game/pc/the-binding-of-isaac?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 25,
              "description": "Adventure"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 32769
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 28, 2011"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/113200/page_bg_generated_v6b.jpg?t=1447354527",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Saints Row: The Third",
          "steam_appid": 55230,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "Get ready for the most out-landish gameplay scenarios ever seen as the Third Street Saints take on the Syndicate!",
          "supported_languages": "Czech, Dutch, English<strong>*</strong>, French, German, Italian, Polish, Russian, Spanish - Spain<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/55230/header.jpg?t=1490283037",
          "website": "http://www.saintsrow.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 999,
            "discount_percent": 0
          },
          "packages": [
            12255,
            17933
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": true
          },
          "metacritic": {
            "score": 84,
            "url": "https://www.metacritic.com/game/pc/saints-row-the-third?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 28499
          },
          "release_date": {
            "coming_soon": false,
            "date": "Nov 14, 2011"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/55230/page_bg_generated_v6b.jpg?t=1490283037",
          "content_descriptors": {
            "ids": [
              5
            ],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Serious Sam Fusion 2017 (beta)",
          "steam_appid": 564310,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Serious Sam Fusion is a central hub for existing and upcoming Serious Sam games developed by Croteam. Cool new features, engine upgrades, patches and updates will be released to existing owners for FREE!",
          "supported_languages": "English<strong>*</strong>, French, Italian, German, Spanish - Spain, Russian<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/564310/header.jpg?t=1517577602",
          "website": "http://www.croteam.com",
          "price_overview": {
            "currency": "USD",
            "initial": 1499,
            "final": 224,
            "discount_percent": 85
          },
          "packages": [
            2535,
            137182
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": null,
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 36,
              "description": "Online Multi-Player"
            },
            {
              "id": 37,
              "description": "Local Multi-Player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 38,
              "description": "Online Co-op"
            },
            {
              "id": 39,
              "description": "Local Co-op"
            },
            {
              "id": 24,
              "description": "Shared/Split Screen"
            },
            {
              "id": 27,
              "description": "Cross-Platform Multiplayer"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            }
          ],
          "genres": [
            {
              "id": 73,
              "description": "Violent"
            },
            {
              "id": 74,
              "description": "Gore"
            },
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": {
            "total": 1091
          },
          "release_date": {
            "coming_soon": false,
            "date": ""
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/564310/page_bg_generated_v6b.jpg?t=1517577602",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Renegade Ops",
          "steam_appid": 99300,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Blast your way through enemy lines to defeat Inferno, a madman intent on global domination. Destruction just got awesome.",
          "supported_languages": "English, French, German, Italian, Spanish - Spain",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/99300/header.jpg?t=1522061011",
          "website": "http://www.sega.co.uk/renegadeops/?t=EnglishUK",
          "price_overview": {
            "currency": "USD",
            "initial": 1500,
            "final": 1500,
            "discount_percent": 0
          },
          "packages": [
            12598,
            13173,
            27830
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 76,
            "url": "https://www.metacritic.com/game/pc/renegade-ops?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 24,
              "description": "Shared/Split Screen"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 557
          },
          "release_date": {
            "coming_soon": false,
            "date": "Oct 26, 2011"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/99300/page_bg_generated_v6b.jpg?t=1522061011",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "X2: The Threat",
          "steam_appid": 2800,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "X²: The Threat is of a new generation of space simulator games, you play the role of Julian Gardna who continues the story set by X: Beyond The Frontier. The updated graphics engine gives the universe a fresher feel with newly designed ships and stations adding to the complexity of the universe.",
          "supported_languages": "English<strong>*</strong>, French, German<strong>*</strong>, Italian, Spanish - Spain<strong>*</strong>, Czech, Polish, Russian<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/2800/header.jpg?t=1512663843",
          "website": "http://www.egosoft.com/games/x2/info_en.php",
          "price_overview": {
            "currency": "USD",
            "initial": 499,
            "final": 249,
            "discount_percent": 50
          },
          "packages": [
            100,
            6330,
            93016
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 72,
            "url": "https://www.metacritic.com/game/pc/x2-the-threat?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 13,
              "description": "Captions available"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 191
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jul 21, 2006"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/2800/page_bg_generated_v6b.jpg?t=1512663843",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Serious Sam 3: BFE",
          "steam_appid": 41070,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Serious Sam 3: BFE is a prequel to the original indie fast action FPS and Game of the Year sensation - Serious Sam: The First Encounter!",
          "supported_languages": "English<strong>*</strong>, French, German, Italian, Spanish - Spain, Russian<strong>*</strong>, Japanese, Simplified Chinese, Bulgarian<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/41070/header.jpg?t=1498679919",
          "website": "http://www.croteam.com",
          "price_overview": {
            "currency": "USD",
            "initial": 3999,
            "final": 399,
            "discount_percent": 90
          },
          "packages": [
            12361
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 72,
            "url": "https://www.metacritic.com/game/pc/serious-sam-3-bfe?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 24,
              "description": "Shared/Split Screen"
            },
            {
              "id": 27,
              "description": "Cross-Platform Multiplayer"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": {
            "total": 11831
          },
          "release_date": {
            "coming_soon": false,
            "date": "Nov 22, 2011"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/41070/page_bg_generated_v6b.jpg?t=1498679919",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "X3: Reunion",
          "steam_appid": 2810,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "The Sequel to the award winning X²: The Threat introduces a new 3D engine as well as a new story, new ships and a new gameplay to greatly increase the variety in the X-universe. The economy of X³: Reunion is more complex than anything seen in the X-universe before.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, German<strong>*</strong>, Spanish - Spain<strong>*</strong>, Italian, Russian<strong>*</strong>, Simplified Chinese, Traditional Chinese, Czech, Polish<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/2810/header.jpg?t=1512663830",
          "website": "http://www.egosoft.com/games/x3/info_en.php",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 499,
            "discount_percent": 50
          },
          "packages": [
            101,
            12985,
            6330,
            93016
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 71,
            "url": "https://www.metacritic.com/game/pc/x3-reunion?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 13,
              "description": "Captions available"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 279
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jul 21, 2006"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/2810/page_bg_generated_v6b.jpg?t=1512663830",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "X3: Terran Conflict",
          "steam_appid": 2820,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "It is the year 2938. The long wished-for encounter of the X Universe and the Earth holds both joy and sorrow for the people. Despite flourishing trade, the clash of the diverse races, cultures and life forms creates new tensions, mistrust and open conflict that need to be overcome!",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, German<strong>*</strong>, Italian, Russian<strong>*</strong>, Polish, Simplified Chinese, Traditional Chinese, Czech, Spanish - Spain, Japanese<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/2820/header.jpg?t=1512663827",
          "website": "http://www.egosoft.com/games/x3tc/info_en.php",
          "price_overview": {
            "currency": "USD",
            "initial": 1599,
            "final": 399,
            "discount_percent": 75
          },
          "packages": [
            1040,
            232278,
            12588,
            12985,
            6330,
            93016
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 73,
            "url": "https://www.metacritic.com/game/pc/x3-terran-conflict?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 13,
              "description": "Captions available"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 28,
              "description": "Simulation"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 1263
          },
          "release_date": {
            "coming_soon": false,
            "date": "Oct 16, 2008"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/2820/page_bg_generated_v6b.jpg?t=1512663827",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "X: Beyond the Frontier",
          "steam_appid": 2840,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "The Human Race had advanced to the point where we could travel among the stars, we developed giant automated machines to help us colonise other worlds, but there was a fault in their programming and they turned and attacked. Forcing us to lay a trap to protect Earth and exiling the Human race to stay on Earth once again.",
          "supported_languages": "English<strong>*</strong>, German<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/2840/header.jpg?t=1512663836",
          "website": "http://www.egosoft.com/games/x/info_en.php",
          "price_overview": {
            "currency": "USD",
            "initial": 499,
            "final": 249,
            "discount_percent": 50
          },
          "packages": [
            6353,
            6330,
            93016
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 67,
            "url": "https://www.metacritic.com/game/pc/x-beyond-the-frontier?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 28,
              "description": "Simulation"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 117
          },
          "release_date": {
            "coming_soon": false,
            "date": "Oct 8, 2010"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/2840/page_bg_generated_v6b.jpg?t=1512663836",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "X: Tension",
          "steam_appid": 2850,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "X-Tension is the eagerly awaited expansion pack to X: Beyond the Frontier. The expansion is not limited by a linear plot line but makes use of new ways to expand your empire. You can now take part in missions that are offered to you throughout the game.",
          "supported_languages": "English<strong>*</strong>, German<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/2850/header.jpg?t=1512663848",
          "website": "http://www.egosoft.com/games/x_tension/info_en.php",
          "price_overview": {
            "currency": "USD",
            "initial": 499,
            "final": 249,
            "discount_percent": 50
          },
          "packages": [
            6354,
            6330,
            93016
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": null,
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 28,
              "description": "Simulation"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": null,
          "release_date": {
            "coming_soon": false,
            "date": "Oct 8, 2010"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/2850/page_bg_generated_v6b.jpg?t=1512663848",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "LIMBO",
          "steam_appid": 48000,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Uncertain of his sister's fate, a boy enters LIMBO",
          "supported_languages": "English, French, German, Italian, Japanese, Korean, Portuguese, Spanish - Spain, Traditional Chinese, Polish, Portuguese - Brazil, Russian, Simplified Chinese, Turkish",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/48000/header.jpg?t=1478090357",
          "website": "http://playdead.com/limbo",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 199,
            "discount_percent": 80
          },
          "packages": [
            11010
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 88,
            "url": "https://www.metacritic.com/game/pc/limbo?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 25,
              "description": "Adventure"
            },
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": {
            "total": 13676
          },
          "release_date": {
            "coming_soon": false,
            "date": "Aug 2, 2011"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/48000/page_bg_generated_v6b.jpg?t=1478090357",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "dlc",
          "name": "X3: Albion Prelude",
          "steam_appid": 201310,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "X3: Albion Prelude is the latest game in the X3 space game series. TRADE, FIGHT, BUILD, THINK in a living and breathing universe. A new plot and many additions to the open free-form gameplay.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, German<strong>*</strong>, Italian, Russian<strong>*</strong>, Polish, Simplified Chinese, Traditional Chinese, Spanish - Spain, Japanese<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/201310/header.jpg?t=1512657152",
          "website": "http://store.steampowered.com/sale/xfranchise",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 499,
            "discount_percent": 50
          },
          "packages": [
            12589,
            12588,
            12985,
            6330,
            93016
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 75,
            "url": "https://www.metacritic.com/game/pc/x3-albion-prelude?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 21,
              "description": "Downloadable Content"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 13,
              "description": "Captions available"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 28,
              "description": "Simulation"
            }
          ],
          "recommendations": {
            "total": 985
          },
          "release_date": {
            "coming_soon": false,
            "date": "Dec 15, 2011"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/201310/page_bg_generated_v6b.jpg?t=1512657152",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Crusader Kings II",
          "steam_appid": 203770,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Explore one of the defining periods in world history in an experience crafted by the masters of Grand Strategy.",
          "supported_languages": "English, French, German, Spanish - Spain",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/203770/header.jpg?t=1539181372",
          "website": "http://www.crusaderkings.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 3999,
            "final": 3999,
            "discount_percent": 0
          },
          "packages": [
            13408
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 82,
            "url": "https://www.metacritic.com/game/pc/crusader-kings-ii?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            }
          ],
          "genres": [
            {
              "id": 3,
              "description": "RPG"
            },
            {
              "id": 28,
              "description": "Simulation"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 18124
          },
          "release_date": {
            "coming_soon": false,
            "date": "Feb 14, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/203770/page_bg_generated_v6b.jpg?t=1539181372",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Fallout: New Vegas",
          "steam_appid": 22380,
          "required_age": 16,
          "is_free": false,
          "controller_support": null,
          "short_description": "Welcome to Vegas. New Vegas. Enjoy your stay!",
          "supported_languages": "English, French, German, Italian, Spanish - Spain",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/22380/header.jpg?t=1533678449",
          "website": "http://fallout.bethsoft.com",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 999,
            "discount_percent": 0
          },
          "packages": [
            6442,
            13435
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 84,
            "url": "https://www.metacritic.com/game/pc/fallout-new-vegas?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 46981
          },
          "release_date": {
            "coming_soon": false,
            "date": "Oct 19, 2010"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/22380/page_bg_generated_v6b.jpg?t=1533678449",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "A Virus Named TOM",
          "steam_appid": 207650,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Hack your way through brain scrambling puzzles while maneuvering through a thumb cramping maze of enemies.",
          "supported_languages": "English<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/207650/header.jpg?t=1478218252",
          "website": "http://www.avirusnamedtom.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 999,
            "discount_percent": 0
          },
          "packages": [
            15935,
            15937
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 65,
            "url": "https://www.metacritic.com/game/pc/a-virus-named-tom?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 24,
              "description": "Shared/Split Screen"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": null,
          "release_date": {
            "coming_soon": false,
            "date": "Aug 1, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/207650/page_bg_generated_v6b.jpg?t=1478218252",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Orcs Must Die!",
          "steam_appid": 102600,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Slice them, burn them, skewer them, and launch them - no matter how you get it done, orcs must die in this fantasy action-strategy game from Robot Entertainment. As a powerful War Mage with dozens of deadly weapons, spells, and traps at your fingertips, defend twenty-four fortresses from a rampaging mob of beastly enemies, including...",
          "supported_languages": "English<strong>*</strong>, German<strong>*</strong>, French<strong>*</strong>, Italian<strong>*</strong>, Spanish - Spain<strong>*</strong>, Russian<strong>*</strong>, Japanese<strong>*</strong>, Polish<strong>*</strong>, Portuguese - Brazil<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/102600/header.jpg?t=1537484197",
          "website": "http://www.orcsmustdie.com",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 249,
            "discount_percent": 75
          },
          "packages": [
            11920,
            13743
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 83,
            "url": "https://www.metacritic.com/game/pc/orcs-must-die!?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 15,
              "description": "Stats"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 4030
          },
          "release_date": {
            "coming_soon": false,
            "date": "Oct 11, 2011"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/102600/page_bg_generated_v6b.jpg?t=1537484197",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Wargame: European Escalation",
          "steam_appid": 58610,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "The New Fatal Error DLC includes a new 5-mission Operation and touch-screen controls.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, German<strong>*</strong>, Italian, Spanish - Spain, Russian, Traditional Chinese<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/58610/header.jpg?t=1505225615",
          "website": "http://wargame-ee.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 999,
            "discount_percent": 0
          },
          "packages": [
            13455
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 81,
            "url": "https://www.metacritic.com/game/pc/wargame-european-escalation?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 8,
              "description": "Valve Anti-Cheat enabled"
            }
          ],
          "genres": [
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 1827
          },
          "release_date": {
            "coming_soon": false,
            "date": "Feb 22, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/58610/page_bg_generated_v6b.jpg?t=1505225615",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "L.A. Noire",
          "steam_appid": 110800,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "L.A. Noire is a violent crime thriller that blends breathtaking action with true detective work to deliver an unprecedented interactive experience. Search for clues, chase down suspects and interrogate witnesses as you struggle to find the truth in a city where everyone has something to hide.",
          "supported_languages": "English<strong>*</strong>, French, German, Italian, Russian, Spanish - Spain<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/110800/header.jpg?t=1533107668",
          "website": "http://www.rockstargames.com/lanoire/agegate/ref/?redirect=",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1999,
            "discount_percent": 0
          },
          "packages": [
            13740,
            12072
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 83,
            "url": "https://www.metacritic.com/game/pc/la-noire-the-complete-edition?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            }
          ],
          "genres": [
            {
              "id": 25,
              "description": "Adventure"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 12527
          },
          "release_date": {
            "coming_soon": false,
            "date": "Nov 8, 2011"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/110800/page_bg_generated_v6b.jpg?t=1533107668",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Men of War: Red Tide",
          "steam_appid": 3130,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Men of War: Red Tide is a sequel to the critically acclaimed RTS Men of War. Red Tide introduces a new story driven campaign based on the writings of Soviet scribe Alexander Zorich, it also includes dozens of new or upgraded units and weapons.",
          "supported_languages": "English<strong>*</strong>, Russian<strong>*</strong>, German, French<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/3130/header.jpg?t=1539178490",
          "website": "http://www.menofwargame.com",
          "price_overview": {
            "currency": "USD",
            "initial": 499,
            "final": 124,
            "discount_percent": 75
          },
          "packages": [
            2365,
            14299
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 77,
            "url": "https://www.metacritic.com/game/pc/men-of-war-red-tide?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 261
          },
          "release_date": {
            "coming_soon": false,
            "date": "Nov 1, 2009"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/3130/page_bg_generated_v6b.jpg?t=1539178490",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Men of War™",
          "steam_appid": 7830,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Men of War is a stunning Real-Time Strategy game that takes place during the height of World War II. Intense battles span Europe and North Africa as gamers play as Soviet, Allied or German forces across 19 massive single-player missions.",
          "supported_languages": "English<strong>*</strong>, Russian<strong>*</strong>, French<strong>*</strong>, Italian<strong>*</strong>, Spanish - Spain<strong>*</strong>, German<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/7830/header.jpg?t=1539763877",
          "website": "http://www.menofwargame.com",
          "price_overview": {
            "currency": "USD",
            "initial": 499,
            "final": 124,
            "discount_percent": 75
          },
          "packages": [
            1610,
            14299
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 80,
            "url": "https://www.metacritic.com/game/pc/men-of-war?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            }
          ],
          "genres": [
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 1547
          },
          "release_date": {
            "coming_soon": false,
            "date": "May 6, 2009"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/7830/page_bg_generated_v6b.jpg?t=1539763877",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Men of War: Vietnam",
          "steam_appid": 63940,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "The critically acclaimed series returns! Experience Vietnam from both sides of the war.",
          "supported_languages": "English<strong>*</strong>, German<strong>*</strong>, Italian<strong>*</strong>, Polish, Russian<strong>*</strong>, Spanish - Spain<strong>*</strong>, French<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/63940/header.jpg?t=1539178549",
          "website": "http://www.menofwargame.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 799,
            "final": 199,
            "discount_percent": 75
          },
          "packages": [
            11498,
            11323,
            14299
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 68,
            "url": "https://www.metacritic.com/game/pc/men-of-war-vietnam?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            }
          ],
          "genres": [
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 505
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 8, 2011"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/63940/page_bg_generated_v6b.jpg?t=1539178549",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Men of War: Assault Squad",
          "steam_appid": 64000,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Men of War: Assault Squad features a completely new cooperative skirmish game mode with access to five different nations (Russia, Germany, USA, Commonwealth and, for the first time ever in the Men of War series, Japan) as well as increased realism and accessibility.",
          "supported_languages": "English, Russian, Italian, Spanish - Spain, French, German, Polish",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/64000/header.jpg?t=1539764412",
          "website": "http://www.menofwargame.com/assault/",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 249,
            "discount_percent": 75
          },
          "packages": [
            7452,
            13358,
            14299,
            13471
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 77,
            "url": "https://www.metacritic.com/game/pc/men-of-war-assault-squad?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            }
          ],
          "genres": [
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 2385
          },
          "release_date": {
            "coming_soon": false,
            "date": "Feb 24, 2011"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/64000/page_bg_generated_v6b.jpg?t=1539764412",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Men of War: Condemned Heroes",
          "steam_appid": 204860,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Men of War: Condemned Heroes tells the story of one of the infamous Soviet penal battalions during the WWII.",
          "supported_languages": "English<strong>*</strong>, Russian<strong>*</strong>, French, German, Italian, Spanish - Spain<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/204860/header.jpg?t=1539178827",
          "website": "http://www.menofwargame.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 799,
            "final": 199,
            "discount_percent": 75
          },
          "packages": [
            14032,
            14299
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 57,
            "url": "https://www.metacritic.com/game/pc/men-of-war-condemned-heroes?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 185
          },
          "release_date": {
            "coming_soon": false,
            "date": "Apr 12, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/204860/page_bg_generated_v6b.jpg?t=1539178827",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "BioShock™",
          "steam_appid": 7670,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "BioShock is a shooter unlike any you've ever played, loaded with weapons and tactics never seen. You'll have a complete arsenal at your disposal from simple revolvers to grenade launchers and chemical throwers, but you'll also be forced to genetically modify your DNA to create an even more deadly weapon: you.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, German<strong>*</strong>, Italian<strong>*</strong>, Spanish - Spain<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/7670/header.jpg?t=1531779231",
          "website": "http://www.BioShockGame.com",
          "price_overview": null,
          "packages": [
            451,
            127633
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": false
          },
          "metacritic": {
            "score": 96,
            "url": "https://www.metacritic.com/game/pc/bioshock?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 15214
          },
          "release_date": {
            "coming_soon": false,
            "date": "Aug 21, 2007"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/7670/page_bg_generated_v6b.jpg?t=1531779231",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "ORION: Prelude",
          "steam_appid": 104900,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Work together to survive the devastating Dinosaur horde in huge, endless environments.",
          "supported_languages": "English<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/104900/header.jpg?t=1535736364",
          "website": null,
          "price_overview": {
            "currency": "USD",
            "initial": 99,
            "final": 62,
            "discount_percent": 37
          },
          "packages": [
            14535
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": null,
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 36,
              "description": "Online Multi-Player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 38,
              "description": "Online Co-op"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 8,
              "description": "Valve Anti-Cheat enabled"
            },
            {
              "id": 15,
              "description": "Stats"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 25,
              "description": "Adventure"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 20006
          },
          "release_date": {
            "coming_soon": false,
            "date": "Apr 16, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/104900/page_bg_generated_v6b.jpg?t=1535736364",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "BioShock™ Remastered",
          "steam_appid": 409710,
          "required_age": 17,
          "is_free": false,
          "controller_support": "full",
          "short_description": "BioShock is a shooter unlike any other, loaded with unique weapons and tactics. Complete with an arsenal of revolvers, shotguns, and grenade launchers, players will be forced to genetically modify their DNA to become an even deadlier weapon.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, Italian<strong>*</strong>, German<strong>*</strong>, Spanish - Spain<strong>*</strong>, Japanese<strong>*</strong>, Simplified Chinese<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/409710/header.jpg?t=1531779427",
          "website": "http://www.BioShockGame.com",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 499,
            "discount_percent": 75
          },
          "packages": [
            451,
            127633
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": false
          },
          "metacritic": {
            "score": 80,
            "url": "https://www.metacritic.com/game/pc/bioshock-the-collection?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 14,
              "description": "Commentary available"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 8919
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 15, 2016"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/409710/page_bg_generated_v6b.jpg?t=1531779427",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "BioShock™ 2 Remastered",
          "steam_appid": 409720,
          "required_age": 17,
          "is_free": false,
          "controller_support": "full",
          "short_description": "In BioShock 2, you step into the boots of the most iconic denizen of Rapture, the Big Daddy, as you explore through the decrepit and beautiful fallen city, chasing an unseen foe in search of answers and your own survival.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, Italian<strong>*</strong>, German<strong>*</strong>, Spanish - Spain<strong>*</strong>, Japanese, Simplified Chinese<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/409720/header.jpg?t=1534538139",
          "website": "http://www.bioshockgame.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 499,
            "discount_percent": 75
          },
          "packages": [
            81419,
            127633
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": null,
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 3512
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 15, 2016"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/409720/page_bg_generated_v6b.jpg?t=1534538139",
          "content_descriptors": {
            "ids": [
              5
            ],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "FTL: Faster Than Light",
          "steam_appid": 212680,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "This &quot;spaceship simulation roguelike-like&quot; allows you to take your ship and crew on an adventure through a randomly generated galaxy filled with glory and bitter defeat.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, Italian<strong>*</strong>, German<strong>*</strong>, Spanish - Spain<strong>*</strong>, Polish<strong>*</strong>, Portuguese - Brazil<strong>*</strong>, Russian<strong>*</strong>, Simplified Chinese<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/212680/header.jpg?t=1538154560",
          "website": "http://www.ftlgame.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 999,
            "discount_percent": 0
          },
          "packages": [
            16589,
            16705
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 84,
            "url": "https://www.metacritic.com/game/pc/ftl-faster-than-light?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            }
          ],
          "genres": [
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 28,
              "description": "Simulation"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 31829
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 14, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/212680/page_bg_generated_v6b.jpg?t=1538154560",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "BioShock® 2",
          "steam_appid": 8850,
          "required_age": 17,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Set approximately 10 years after the events of the original BioShock, the halls of Rapture once again echo with sins of the past. Along the Atlantic coastline, a monster has been snatching little girls and bringing them back to the undersea city of Rapture.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, German<strong>*</strong>, Italian<strong>*</strong>, Spanish - Spain<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/8850/header.jpg?t=1534538233",
          "website": "http://www.bioshockgame.com",
          "price_overview": null,
          "packages": [
            81419,
            127633
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": false
          },
          "metacritic": {
            "score": 88,
            "url": "https://www.metacritic.com/game/pc/bioshock-2?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 6833
          },
          "release_date": {
            "coming_soon": false,
            "date": "Feb 9, 2010"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/8850/page_bg_generated_v6b.jpg?t=1534538233",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Bastion",
          "steam_appid": 107100,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Discover the secrets of the Calamity, a surreal catastrophe that shattered the world to pieces.",
          "supported_languages": "English<strong>*</strong>, French, German, Italian, Spanish - Spain, Simplified Chinese<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/107100/header.jpg?t=1533920119",
          "website": "https://www.supergiantgames.com/games/bastion/",
          "price_overview": {
            "currency": "USD",
            "initial": 1499,
            "final": 1499,
            "discount_percent": 0
          },
          "packages": [
            11072,
            11157
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 86,
            "url": "https://www.metacritic.com/game/pc/bastion?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 20154
          },
          "release_date": {
            "coming_soon": false,
            "date": "Aug 16, 2011"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/107100/page_bg_generated_v6b.jpg?t=1533920119",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Penny Arcade's On the Rain-Slick Precipice of Darkness 3",
          "steam_appid": 213030,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "The Startling Developments Detective Agency springs into action as On the Rain-Slick Precipice of Darkness 3 begins, set in motion by a call from a mysterious source. The ever escalating perils on the Rain-Slick Precipice of Darkness will season our tender heroes to their very core!",
          "supported_languages": "English<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/213030/header.jpg?t=1447355903",
          "website": "http://rainslick.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 199,
            "final": 59,
            "discount_percent": 70
          },
          "packages": [
            15176,
            28354
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": false
          },
          "metacritic": null,
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 417
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jun 25, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/213030/page_bg_generated_v6b.jpg?t=1447355903",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Nuclear Dawn",
          "steam_appid": 17710,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Explore war-torn post-apocalyptic landscapes and take fight against enemies using various weapons in this FPS/RTS hybrid.",
          "supported_languages": "English<strong>*</strong>, Czech, German<strong>*</strong>, Russian, Spanish - Spain, Korean<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/17710/header.jpg?t=1526947747",
          "website": "http://www.gameconnect.net/projects",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 199,
            "discount_percent": 80
          },
          "packages": [
            11698,
            11699,
            66789
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 71,
            "url": "https://www.metacritic.com/game/pc/nuclear-dawn?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 27,
              "description": "Cross-Platform Multiplayer"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 8,
              "description": "Valve Anti-Cheat enabled"
            },
            {
              "id": 15,
              "description": "Stats"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 1311
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 26, 2011"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/17710/page_bg_generated_v6b.jpg?t=1526947747",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Spec Ops: The Line",
          "steam_appid": 50300,
          "required_age": 17,
          "is_free": false,
          "controller_support": "full",
          "short_description": "A Third-Person modern military Shooter designed to challenge players' morality by putting them in the middle of unspeakable situations.",
          "supported_languages": "English, French, German, Italian, Japanese, Spanish - Spain",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/50300/header.jpg?t=1532333777",
          "website": "http://www.specopstheline.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 2999,
            "final": 599,
            "discount_percent": 80
          },
          "packages": [
            15185
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 76,
            "url": "https://www.metacritic.com/game/pc/spec-ops-the-line?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 27,
              "description": "Cross-Platform Multiplayer"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 15,
              "description": "Stats"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 25,
              "description": "Adventure"
            }
          ],
          "recommendations": {
            "total": 17117
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jun 25, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/50300/page_bg_generated_v6b.jpg?t=1532333777",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Tom Clancy's Ghost Recon: Future Soldier™",
          "steam_appid": 212630,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "Join an elite team of special-ops soldiers in the globe’s most deadly warzones to hunt down the highest value targets.",
          "supported_languages": "English<strong>*</strong>, Danish, Dutch, French<strong>*</strong>, German<strong>*</strong>, Italian<strong>*</strong>, Norwegian, Polish, Portuguese - Brazil, Spanish - Spain<strong>*</strong>, Swedish<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/212630/header.jpg?t=1472606318",
          "website": "http://www.ghostrecon.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1999,
            "discount_percent": 0
          },
          "packages": [
            15197,
            15198
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 71,
            "url": "https://www.metacritic.com/game/pc/tom-clancys-ghost-recon-future-soldier?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 2621
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jun 26, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/212630/page_bg_generated_v6b.jpg?t=1472606318",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Endless Space® - Collection",
          "steam_appid": 208140,
          "required_age": 0,
          "is_free": true,
          "controller_support": null,
          "short_description": "Endless Space is a turn-based 4X strategy game, covering the space colonization age in the Endless universe, where you can control every aspect of your civilization as you strive for galactic domination.",
          "supported_languages": "English<strong>*</strong>, French, German, Polish, Italian, Russian, Spanish - Spain<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/208140/header.jpg?t=1533252142",
          "website": "https://www.games2gether.com/endless-space/blogs",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1999,
            "discount_percent": 0
          },
          "packages": [
            149433,
            292317
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": false
          },
          "metacritic": {
            "score": 77,
            "url": "https://www.metacritic.com/game/pc/endless-space?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 36,
              "description": "Online Multi-Player"
            },
            {
              "id": 27,
              "description": "Cross-Platform Multiplayer"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 5578
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jul 4, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/208140/page_bg_generated_v6b.jpg?t=1533252142",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "To the Moon",
          "steam_appid": 206440,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "A story-driven experience about two doctors traversing backwards through a dying man's memories to artificially fulfill his last wish.",
          "supported_languages": "English, French, German, Italian, Russian, Korean, Spanish - Spain, Polish, Portuguese - Brazil, Turkish, Simplified Chinese, Ukrainian",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/206440/header.jpg?t=1530767611",
          "website": "http://www.freebirdgames.com/to_the_moon/",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 499,
            "discount_percent": 50
          },
          "packages": [
            15371,
            15373
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 81,
            "url": "https://www.metacritic.com/game/pc/to-the-moon?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 25,
              "description": "Adventure"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 28568
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 7, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/206440/page_bg_generated_v6b.jpg?t=1530767611",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Alan Wake",
          "steam_appid": 108710,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "A Dark Presence stalks the small town of Bright Falls, pushing Alan Wake to the brink of sanity in his fight to unravel the mystery and save his love.",
          "supported_languages": "English<strong>*</strong>, German<strong>*</strong>, French<strong>*</strong>, Italian<strong>*</strong>, Korean, Spanish - Spain<strong>*</strong>, Russian, Japanese<strong>*</strong>, Polish, Traditional Chinese, Spanish - Latin America<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/108710/header.jpg?t=1540487129",
          "website": "http://www.alanwake.com",
          "price_overview": {
            "currency": "USD",
            "initial": 1499,
            "final": 300,
            "discount_percent": 80
          },
          "packages": [
            13533,
            13535,
            15407
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 83,
            "url": "https://www.metacritic.com/game/pc/alan-wake?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 25,
              "description": "Adventure"
            }
          ],
          "recommendations": {
            "total": 15841
          },
          "release_date": {
            "coming_soon": false,
            "date": "Feb 16, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/108710/page_bg_generated_v6b.jpg?t=1540487129",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Alan Wake's American Nightmare",
          "steam_appid": 202750,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "A thrilling new storyline, hordes of creepy enemies, serious firepower and beautiful Arizona locations, combined with a fun and challenging new game mode!",
          "supported_languages": "English<strong>*</strong>, German, French, Italian, Spanish - Spain, Japanese, Czech, Hungarian, Polish, Russian<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/202750/header.jpg?t=1540207470",
          "website": "http://www.alanwake.com",
          "price_overview": {
            "currency": "USD",
            "initial": 899,
            "final": 180,
            "discount_percent": 80
          },
          "packages": [
            14562,
            15407
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 73,
            "url": "https://www.metacritic.com/game/pc/alan-wakes-american-nightmare?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 28,
              "description": "Full controller support"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 25,
              "description": "Adventure"
            }
          ],
          "recommendations": {
            "total": 3306
          },
          "release_date": {
            "coming_soon": false,
            "date": "May 22, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/202750/page_bg_generated_v6b.jpg?t=1540207470",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Crysis",
          "steam_appid": 17300,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "Adapt to Survive  An epic story thrusts players into an ever-changing environment, forcing them to adapt their tactics and approach to conquer battlefields ranging from newly frozen jungle to zero-gravity alien environments. Suit up!  A high-tech Nanosuit allows gamers to augment their abilities in real time on the battlefield.",
          "supported_languages": "English, French, German, Spanish - Spain, Italian, Czech, Polish, Russian, Hungarian",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/17300/header.jpg?t=1447351450",
          "website": "http://www.ea.com/crysis",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 499,
            "discount_percent": 75
          },
          "packages": [
            980,
            987,
            15609
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 91,
            "url": "https://www.metacritic.com/game/pc/crysis?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 6224
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 17, 2008"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/17300/page_bg_generated_v6b.jpg?t=1447351450",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Crysis Warhead®",
          "steam_appid": 17330,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "Pulse-racing new installment from 2007's PC Game of the Year*: Play as Sergeant Sykes and experience a whole new side of the battle. A standard combat mission behind enemy lines becomes critical when you discover your enemies have captured something of vital importance to the ensuing war.",
          "supported_languages": "English, French, German, Spanish - Spain, Italian, Czech, Polish, Russian, Hungarian",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/17330/header.jpg?t=1447351452",
          "website": "http://crysiswarhead.ea.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 499,
            "discount_percent": 75
          },
          "packages": [
            984,
            987,
            15609
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 84,
            "url": "https://www.metacritic.com/game/pc/crysis-warhead?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 1709
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 17, 2008"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/17330/page_bg_generated_v6b.jpg?t=1447351452",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Crysis 2 - Maximum Edition",
          "steam_appid": 108800,
          "required_age": 16,
          "is_free": false,
          "controller_support": null,
          "short_description": "Aliens are decimating New York City, only you have the technology to survive. Be The Weapon.",
          "supported_languages": "Czech, English, French, German, Italian, Japanese, Polish, Russian, Spanish - Spain, Traditional Chinese, Turkish",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/108800/header.jpg?t=1447355745",
          "website": "http://www.mycrysis.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 2999,
            "final": 749,
            "discount_percent": 75
          },
          "packages": [
            14840,
            15609,
            980,
            984
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": null,
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 4677
          },
          "release_date": {
            "coming_soon": false,
            "date": "Mar 22, 2011"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/108800/page_bg_generated_v6b.jpg?t=1447355745",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Crysis Warhead®",
          "steam_appid": 17330,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "Pulse-racing new installment from 2007's PC Game of the Year*: Play as Sergeant Sykes and experience a whole new side of the battle. A standard combat mission behind enemy lines becomes critical when you discover your enemies have captured something of vital importance to the ensuing war.",
          "supported_languages": "English, French, German, Spanish - Spain, Italian, Czech, Polish, Russian, Hungarian",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/17330/header.jpg?t=1447351452",
          "website": "http://crysiswarhead.ea.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 499,
            "discount_percent": 75
          },
          "packages": [
            984,
            987,
            15609
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 84,
            "url": "https://www.metacritic.com/game/pc/crysis-warhead?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 1709
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 17, 2008"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/17330/page_bg_generated_v6b.jpg?t=1447351452",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Arx Fatalis",
          "steam_appid": 1700,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "This critically acclaimed first-person RPG takes the player on an amazing journey into the fantasy world of Arx. The game mixes intelligent story with immersive and actual medieval surroundings. Arx Fatalis allows the player to feel that all his actions have a direct consequence on those around him.",
          "supported_languages": "English, French, German, Italian, Spanish - Spain, Russian",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/1700/header.jpg?t=1478190772",
          "website": "http://www.arxfatalis-online.com/index_eng.php",
          "price_overview": {
            "currency": "USD",
            "initial": 499,
            "final": 499,
            "discount_percent": 0
          },
          "packages": [
            302
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 77,
            "url": "https://www.metacritic.com/game/pc/arx-fatalis?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            }
          ],
          "genres": [
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 656
          },
          "release_date": {
            "coming_soon": false,
            "date": "Apr 3, 2007"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/1700/page_bg_generated_v6b.jpg?t=1478190772",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Dishonored",
          "steam_appid": 205100,
          "required_age": 17,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Dishonored is an immersive first-person action game that casts you as a supernatural assassin driven by revenge. With Dishonored’s flexible combat system, creatively eliminate your targets as you combine the supernatural abilities, weapons and unusual gadgets at your disposal.",
          "supported_languages": "English<strong>*</strong>, German<strong>*</strong>, French<strong>*</strong>, Italian<strong>*</strong>, Spanish - Spain<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/205100/header.jpg?t=1497057346",
          "website": "http://www.dishonored.com",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 999,
            "discount_percent": 0
          },
          "packages": [
            17207,
            31292,
            183039
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 91,
            "url": "https://www.metacritic.com/game/pc/dishonored?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 25,
              "description": "Adventure"
            }
          ],
          "recommendations": {
            "total": 29745
          },
          "release_date": {
            "coming_soon": false,
            "date": "Oct 8, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/205100/page_bg_generated_v6b.jpg?t=1497057346",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Deponia",
          "steam_appid": 214340,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "In Deponia, the world has degenerated into a vast garbage dump, in which the crotchety Rufus ekes out his sorry existence.",
          "supported_languages": "English<strong>*</strong>, German<strong>*</strong>, Russian, French, Polish, Italian<strong>*</strong>, Spanish - Spain<strong>*</strong>, Bulgarian, Greek, Turkish, Czech, Portuguese - Brazil<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/214340/header.jpg?t=1524051764",
          "website": "http://www.deponia.de",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 99,
            "discount_percent": 90
          },
          "packages": [
            15376,
            232463,
            44162,
            55062
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 74,
            "url": "https://www.metacritic.com/game/pc/deponia?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 25,
              "description": "Adventure"
            },
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": {
            "total": 5764
          },
          "release_date": {
            "coming_soon": false,
            "date": "Aug 6, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/214340/page_bg_generated_v6b.jpg?t=1524051764",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Rocketbirds: Hardboiled Chicken",
          "steam_appid": 215510,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Annihilate an evil penguin regime in this cinematic platform adventure game offering full solo and co-op campaigns.",
          "supported_languages": "English<strong>*</strong>, German, French, Italian, Spanish - Spain, Simplified Chinese, Traditional Chinese, Japanese, Portuguese, Dutch, Portuguese - Brazil, Korean<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/215510/header.jpg?t=1485321371",
          "website": "http://www.rocketbirds.com/hardboiledchicken",
          "price_overview": {
            "currency": "USD",
            "initial": 499,
            "final": 99,
            "discount_percent": 80
          },
          "packages": [
            17346
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 74,
            "url": "https://www.metacritic.com/game/pc/rocketbirds-hardboiled-chicken?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 38,
              "description": "Online Co-op"
            },
            {
              "id": 24,
              "description": "Shared/Split Screen"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 25,
              "description": "Adventure"
            },
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": {
            "total": 1527
          },
          "release_date": {
            "coming_soon": false,
            "date": "Oct 15, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/215510/page_bg_generated_v6b.jpg?t=1485321371",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Counter-Strike: Global Offensive",
          "steam_appid": 730,
          "required_age": 0,
          "is_free": true,
          "controller_support": "full",
          "short_description": "Counter-Strike: Global Offensive (CS: GO) will expand upon the team-based action gameplay that it pioneered when it was launched 14 years ago. CS: GO features new maps, characters, and weapons and delivers updated versions of the classic CS content (de_dust2, etc.).",
          "supported_languages": "Czech, Danish, Dutch, English<strong>*</strong>, Finnish, French, German, Hungarian, Italian, Japanese, Korean, Norwegian, Polish, Portuguese, Portuguese - Brazil, Romanian, Russian, Simplified Chinese, Spanish - Spain, Swedish, Thai, Traditional Chinese, Turkish, Bulgarian, Ukrainian<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/730/header.jpg?t=1540300672",
          "website": "http://blog.counter-strike.net/",
          "price_overview": {
            "currency": "USD",
            "initial": 1499,
            "final": 1499,
            "discount_percent": 0
          },
          "packages": [
            303386,
            298963,
            54029
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 83,
            "url": "https://www.metacritic.com/game/pc/counter-strike-global-offensive?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 35,
              "description": "In-App Purchases"
            },
            {
              "id": 8,
              "description": "Valve Anti-Cheat enabled"
            },
            {
              "id": 15,
              "description": "Stats"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 1989618
          },
          "release_date": {
            "coming_soon": false,
            "date": "Aug 21, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/730/page_bg_generated_v6b.jpg?t=1540300672",
          "content_descriptors": {
            "ids": [
              2,
              5
            ],
            "notes": "Includes intense violence and blood."
          }
        },
        {
          "type": "game",
          "name": "Borderlands 2",
          "steam_appid": 49520,
          "required_age": 17,
          "is_free": false,
          "controller_support": "full",
          "short_description": "The Ultimate Vault Hunter’s Upgrade lets you get the most out of the Borderlands 2 experience.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, German<strong>*</strong>, Italian<strong>*</strong>, Japanese<strong>*</strong>, Spanish - Spain<strong>*</strong>, Korean, Traditional Chinese<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/49520/header.jpg?t=1536253880",
          "website": "http://www.borderlands2.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1999,
            "discount_percent": 0
          },
          "packages": [
            16724,
            16726,
            32848,
            46441
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 89,
            "url": "https://www.metacritic.com/game/pc/borderlands-2?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 85151
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 17, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/49520/page_bg_generated_v6b.jpg?t=1536253880",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "XCOM: Enemy Unknown",
          "steam_appid": 200510,
          "required_age": 17,
          "is_free": false,
          "controller_support": "full",
          "short_description": "The XCOM: Enemy Unknown - Slingshot Pack is Now Available!",
          "supported_languages": "English<strong>*</strong>, German<strong>*</strong>, French<strong>*</strong>, Italian<strong>*</strong>, Korean, Spanish - Spain<strong>*</strong>, Russian<strong>*</strong>, Japanese, Polish<strong>*</strong>, Traditional Chinese<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/200510/header.jpg?t=1537469648",
          "website": "http://www.xcom.com/enemyunknown/",
          "price_overview": {
            "currency": "USD",
            "initial": 2999,
            "final": 749,
            "discount_percent": 75
          },
          "packages": [
            17222,
            37429,
            46437
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 89,
            "url": "https://www.metacritic.com/game/pc/xcom-enemy-unknown?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 27,
              "description": "Cross-Platform Multiplayer"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 24976
          },
          "release_date": {
            "coming_soon": false,
            "date": "Oct 8, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/200510/page_bg_generated_v6b.jpg?t=1537469648",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Mark of the Ninja",
          "steam_appid": 214560,
          "required_age": 17,
          "is_free": false,
          "controller_support": "full",
          "short_description": "In Mark of the Ninja, you'll know what it is to truly be a ninja. You must be silent, agile and clever to outwit your opponents in a world of gorgeous scenery and flowing animation. Marked with cursed tattoos giving you heightened senses, every situation presents you with options.",
          "supported_languages": "English<strong>*</strong>, German, French, Italian, Spanish - Spain, Japanese<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/214560/header.jpg?t=1537892880",
          "website": "http://www.markoftheninja.com",
          "price_overview": null,
          "packages": [
            271120,
            310210
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 91,
            "url": "https://www.metacritic.com/game/pc/mark-of-the-ninja?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 25,
              "description": "Adventure"
            },
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": {
            "total": 11043
          },
          "release_date": {
            "coming_soon": false,
            "date": ""
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/214560/page_bg_generated_v6b.jpg?t=1537892880",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Torchlight II",
          "steam_appid": 200710,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "The adventure continues in Torchlight II! An Action RPG filled with epic battles, bountiful treasure, and a fully randomized world. Bring your friends along for the journey with online and LAN multiplayer.",
          "supported_languages": "English<strong>*</strong>, Japanese<strong>*</strong>, Simplified Chinese<strong>*</strong>, Traditional Chinese<strong>*</strong>, German<strong>*</strong>, Polish<strong>*</strong>, Russian<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/200710/header.jpg?t=1501607860",
          "website": "http://www.torchlight2game.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 399,
            "discount_percent": 80
          },
          "packages": [
            16831,
            2288
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 88,
            "url": "https://www.metacritic.com/game/pc/torchlight-ii?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 27,
              "description": "Cross-Platform Multiplayer"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 25,
              "description": "Adventure"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 21230
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 20, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/200710/page_bg_generated_v6b.jpg?t=1501607860",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Hotline Miami",
          "steam_appid": 219150,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "Hotline Miami is a high-octane action game overflowing with raw brutality, hard-boiled gunplay and skull crushing close combat.",
          "supported_languages": "English, French, German, Spanish - Spain, Portuguese - Brazil, Russian, Polish",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/219150/header.jpg?t=1498680087",
          "website": null,
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 249,
            "discount_percent": 75
          },
          "packages": [
            17111
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 85,
            "url": "https://www.metacritic.com/game/pc/hotline-miami?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": {
            "total": 35878
          },
          "release_date": {
            "coming_soon": false,
            "date": "Oct 23, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/219150/page_bg_generated_v6b.jpg?t=1498680087",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Castle Crashers®",
          "steam_appid": 204360,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Hack, slash, and smash your way to victory in this award winning 2D arcade adventure from The Behemoth!",
          "supported_languages": "English<strong>*</strong>, German, French, Italian, Korean, Spanish - Spain, Simplified Chinese, Traditional Chinese, Japanese, Portuguese, Russian<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/204360/header.jpg?t=1530126130",
          "website": "http://www.thebehemoth.com",
          "price_overview": {
            "currency": "USD",
            "initial": 1499,
            "final": 299,
            "discount_percent": 80
          },
          "packages": [
            16675,
            16965,
            43401
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": false
          },
          "metacritic": null,
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 36,
              "description": "Online Multi-Player"
            },
            {
              "id": 37,
              "description": "Local Multi-Player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 38,
              "description": "Online Co-op"
            },
            {
              "id": 39,
              "description": "Local Co-op"
            },
            {
              "id": 24,
              "description": "Shared/Split Screen"
            },
            {
              "id": 27,
              "description": "Cross-Platform Multiplayer"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 25,
              "description": "Adventure"
            },
            {
              "id": 4,
              "description": "Casual"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 35052
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 26, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/204360/page_bg_generated_v6b.jpg?t=1530126130",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        null,
        {
          "type": "game",
          "name": "Sanctum",
          "steam_appid": 91600,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "You think Tower Defense games are all about building? You thought wrong. Sanctum is not your average Tower Defense title. When the havoc starts, you get to join the fray! As one of the world’s first First Person Shooter - Tower Defense games, Sanctum has taken the best of both worlds to deliver an epic, one-of-a-kind experience.",
          "supported_languages": "English, Danish, French, German, Spanish - Spain, Swedish, Japanese, Polish, Dutch, Italian, Russian, Turkish",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/91600/header.jpg?t=1514905404",
          "website": "http://www.sanctumgame.com",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 249,
            "discount_percent": 75
          },
          "packages": [
            7668,
            8718
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": false
          },
          "metacritic": {
            "score": 70,
            "url": "https://www.metacritic.com/game/pc/sanctum-2011?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 27,
              "description": "Cross-Platform Multiplayer"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 4,
              "description": "Casual"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 1630
          },
          "release_date": {
            "coming_soon": false,
            "date": "Apr 15, 2011"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/91600/page_bg_generated_v6b.jpg?t=1514905404",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Natural Selection 2",
          "steam_appid": 4920,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "A fast paced multiplayer shooter that pits aliens against humans in a strategic and action-packed struggle for survival!",
          "supported_languages": "English<strong>*</strong>, French, German, Spanish - Spain, Polish, Russian, Finnish, Romanian, Swedish, Czech<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/4920/header.jpg?t=1536154782",
          "website": "http://www.naturalselection2.com",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 249,
            "discount_percent": 75
          },
          "packages": [
            17843,
            16496,
            17844,
            25983
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": true
          },
          "metacritic": {
            "score": 80,
            "url": "https://www.metacritic.com/game/pc/natural-selection-2?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 36,
              "description": "Online Multi-Player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 8,
              "description": "Valve Anti-Cheat enabled"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 6015
          },
          "release_date": {
            "coming_soon": false,
            "date": "Oct 30, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/4920/page_bg_generated_v6b.jpg?t=1536154782",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Chivalry: Medieval Warfare",
          "steam_appid": 219640,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Besiege castles and raid villages in Chivalry: Medieval Warfare, a fast-paced medieval first person slasher with a focus on multiplayer battles",
          "supported_languages": "English<strong>*</strong>, German, French, Italian, Spanish - Spain, Russian, Polish, Simplified Chinese, Traditional Chinese<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/219640/header.jpg?t=1527266022",
          "website": "http://www.tornbanner.com/chivalry",
          "price_overview": {
            "currency": "USD",
            "initial": 2499,
            "final": 2499,
            "discount_percent": 0
          },
          "packages": [
            17423,
            235870,
            17426,
            30564
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 79,
            "url": "https://www.metacritic.com/game/pc/chivalry-medieval-warfare?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 8,
              "description": "Valve Anti-Cheat enabled"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": {
            "total": 42086
          },
          "release_date": {
            "coming_soon": false,
            "date": "Oct 16, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/219640/page_bg_generated_v6b.jpg?t=1527266022",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "POSTAL 2",
          "steam_appid": 223470,
          "required_age": 18,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Live a week in the life of &quot;The Postal Dude&quot;; a hapless everyman just trying to check off some chores. Buying milk, returning an overdue library book, getting Gary Coleman's autograph, what could possibly go wrong?",
          "supported_languages": "English<strong>*</strong>, Russian<strong>*</strong>, Simplified Chinese<strong>*</strong>, Spanish - Spain, Turkish<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/223470/header.jpg?t=1531957471",
          "website": "http://www.runningwithscissors.com",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 99,
            "discount_percent": 90
          },
          "packages": [
            17915,
            18190,
            235346,
            69654
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 59,
            "url": "https://www.metacritic.com/game/pc/postal-2-share-the-pain?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 25,
              "description": "Adventure"
            },
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": {
            "total": 29557
          },
          "release_date": {
            "coming_soon": false,
            "date": "Nov 2, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/223470/page_bg_generated_v6b.jpg?t=1531957471",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Worms Revolution",
          "steam_appid": 200170,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Worms™ Revolution is the latest game in the classic turn-based strategy series to come to the PC.",
          "supported_languages": "English<strong>*</strong>, German, French, Italian, Spanish - Spain, Polish, Russian, Czech<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/200170/header.jpg?t=1448453014",
          "website": "http://www.team17.com",
          "price_overview": {
            "currency": "USD",
            "initial": 1499,
            "final": 374,
            "discount_percent": 75
          },
          "packages": [
            17226,
            17227,
            31437
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 73,
            "url": "https://www.metacritic.com/game/pc/worms-revolution?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 24,
              "description": "Shared/Split Screen"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            }
          ],
          "genres": [
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 2813
          },
          "release_date": {
            "coming_soon": false,
            "date": "Oct 10, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/200170/page_bg_generated_v6b.jpg?t=1448453014",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "S.T.A.L.K.E.R.: Shadow of Chernobyl",
          "steam_appid": 4500,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "S.T.A.L.K.E.R.: Shadow of Chernobyl tells a story about survival in the Zone – a very dangerous place, where you fear not only the radiation, anomalies and deadly creatures, but other S.T.A.L.K.E.R.s, who have their own goals and wishes.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, Italian<strong>*</strong>, Spanish - Spain<strong>*</strong>, German<strong>*</strong>, Russian<strong>*</strong>, Ukrainian<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/4500/header.jpg?t=1540832495",
          "website": "http://www.stalker-game.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 599,
            "discount_percent": 70
          },
          "packages": [
            466,
            35983
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 82,
            "url": "https://www.metacritic.com/game/pc/stalker-shadow-of-chernobyl?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 7842
          },
          "release_date": {
            "coming_soon": false,
            "date": "Mar 20, 2007"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/4500/page_bg_generated_v6b.jpg?t=1540832495",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Call of Duty®: Black Ops II",
          "steam_appid": 202970,
          "required_age": 17,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Pushing the boundaries of what fans have come to expect from the record-setting entertainment franchise, Call of Duty®: Black Ops II propels players into a near future Cold War",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, German<strong>*</strong>, Italian<strong>*</strong>, Spanish - Spain<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/202970/header.jpg?t=1492633735",
          "website": "http://www.callofduty.com",
          "price_overview": {
            "currency": "USD",
            "initial": 5999,
            "final": 2939,
            "discount_percent": 51
          },
          "packages": [
            18052,
            16361,
            49986,
            49993,
            17569,
            6473
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 74,
            "url": "https://www.metacritic.com/game/pc/call-of-duty-black-ops-ii?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 8,
              "description": "Valve Anti-Cheat enabled"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 8800
          },
          "release_date": {
            "coming_soon": false,
            "date": "Nov 12, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/202970/page_bg_generated_v6b.jpg?t=1492633735",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Call of Duty®: Black Ops II",
          "steam_appid": 202970,
          "required_age": 17,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Pushing the boundaries of what fans have come to expect from the record-setting entertainment franchise, Call of Duty®: Black Ops II propels players into a near future Cold War",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, German<strong>*</strong>, Italian<strong>*</strong>, Spanish - Spain<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/202970/header.jpg?t=1492633735",
          "website": "http://www.callofduty.com",
          "price_overview": {
            "currency": "USD",
            "initial": 5999,
            "final": 2939,
            "discount_percent": 51
          },
          "packages": [
            18052,
            16361,
            49986,
            49993,
            17569,
            6473
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 74,
            "url": "https://www.metacritic.com/game/pc/call-of-duty-black-ops-ii?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 8,
              "description": "Valve Anti-Cheat enabled"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 8800
          },
          "release_date": {
            "coming_soon": false,
            "date": "Nov 12, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/202970/page_bg_generated_v6b.jpg?t=1492633735",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "advertising",
          "name": "Call of Duty: Black Ops II - Zombies",
          "steam_appid": 212910,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "",
          "supported_languages": null,
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/212910/header.jpg?t=1447355898",
          "website": null,
          "price_overview": null,
          "packages": null,
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": null,
          "categories": null,
          "genres": null,
          "recommendations": null,
          "release_date": {
            "coming_soon": false,
            "date": ""
          },
          "background": null,
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Company of Heroes - Legacy Edition",
          "steam_appid": 4560,
          "required_age": 17,
          "is_free": true,
          "controller_support": null,
          "short_description": "Delivering a visceral WWII gaming experience, Company of Heroes redefines RTS by bringing the sacrifice of heroic soldiers, war-ravaged environments, and dynamic battlefields to life. This legacy version also grants access to the latest version of COH, just called &quot;Company of Heroes&quot;.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, Spanish - Spain, Italian, German<strong>*</strong>, Czech, Japanese, Korean, Polish, Russian<strong>*</strong>, Traditional Chinese<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/4560/header.jpg?t=1510112925",
          "website": "http://www.companyofheroesgame.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1999,
            "discount_percent": 0
          },
          "packages": [
            403,
            1529,
            52874
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 93,
            "url": "https://www.metacritic.com/game/pc/company-of-heroes?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 73,
              "description": "Violent"
            },
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 3077
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jul 17, 2007"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/4560/page_bg_generated_v6b.jpg?t=1510112925",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Company of Heroes: Opposing Fronts",
          "steam_appid": 9340,
          "required_age": 18,
          "is_free": false,
          "controller_support": null,
          "short_description": "The next chapter in the #1 rated RTS franchise thrusts players into a hellish war torn landscape to command two battle-hardened armies in relentless campaigns for honor and country. Players lead the tenacious British 2nd Army during the heroic World War II liberation of Caen, France, and command the German Panzer Elite as they struggle...",
          "supported_languages": "English",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/9340/header.jpg?t=1521806661",
          "website": "http://www.companyofheroesgame.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1999,
            "discount_percent": 0
          },
          "packages": [
            504,
            1529,
            52874
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 87,
            "url": "https://www.metacritic.com/game/pc/company-of-heroes-opposing-fronts?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 373
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 24, 2007"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/9340/page_bg_generated_v6b.jpg?t=1521806661",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Blade Symphony",
          "steam_appid": 225600,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Prove you are the world's greatest swordsman! Engage in tactical 1 vs. 1 sword fighting, 2 vs. 2, or sandbox FFA, or capture Control Points in a tactical slash-em-up.",
          "supported_languages": "English<strong>*</strong>, Japanese<strong>*</strong>, Russian<strong>*</strong>, German<strong>*</strong>, Spanish - Spain<strong>*</strong>, Dutch<strong>*</strong>, Hungarian<strong>*</strong>, Portuguese<strong>*</strong>, French<strong>*</strong>, Korean<strong>*</strong>, Portuguese - Brazil<strong>*</strong>, Italian<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/225600/header.jpg?t=1540330874",
          "website": "http://www.blade-symphony.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 99,
            "final": 99,
            "discount_percent": 0
          },
          "packages": [
            27252,
            42496,
            43780
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 72,
            "url": "https://www.metacritic.com/game/pc/blade-symphony?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 36,
              "description": "Online Multi-Player"
            },
            {
              "id": 37,
              "description": "Local Multi-Player"
            },
            {
              "id": 27,
              "description": "Cross-Platform Multiplayer"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 35,
              "description": "In-App Purchases"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 15,
              "description": "Stats"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            },
            {
              "id": 16,
              "description": "Includes Source SDK"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": {
            "total": 2792
          },
          "release_date": {
            "coming_soon": false,
            "date": "May 7, 2014"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/225600/page_bg_generated_v6b.jpg?t=1540330874",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Company of Heroes: Tales of Valor",
          "steam_appid": 20540,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "Company of Heroes®: Tales of Valor™ is the expansion to the Game of the Year winner and highest rated real time strategy franchise Company of Heroes®. Featuring new campaigns to overcome, units to command, and battlefields to conquer, Company of Heroes®: Tales of Valor™ delivers evolved gameplay mechanics and 3 episodic adventures...",
          "supported_languages": "English, French, German, Italian, Spanish - Spain",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/20540/header.jpg?t=1521806653",
          "website": "http://www.companyofheroesgame.com",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1999,
            "discount_percent": 0
          },
          "packages": [
            1527,
            1529,
            52874
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 70,
            "url": "https://www.metacritic.com/game/pc/company-of-heroes-tales-of-valor?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 853
          },
          "release_date": {
            "coming_soon": false,
            "date": "Apr 8, 2009"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/20540/page_bg_generated_v6b.jpg?t=1521806653",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Darksiders™",
          "steam_appid": 50620,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "Deceived by the forces of evil into prematurely bringing about the end of the world, War – the first Horseman of the Apocalypse – stands accused of breaking the sacred law by inciting a war between Heaven and Hell. In the slaughter that ensued, the demonic forces defeated the heavenly hosts and laid claim to the Earth.",
          "supported_languages": "English, French, German, Italian, Spanish - Spain, Czech, Japanese, Polish, Russian",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/50620/header.jpg?t=1531138449",
          "website": "http://www.darksiders.com",
          "price_overview": null,
          "packages": [
            101199,
            81557,
            123985
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 83,
            "url": "https://www.metacritic.com/game/pc/darksiders?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 25,
              "description": "Adventure"
            }
          ],
          "recommendations": {
            "total": 5983
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 23, 2010"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/50620/page_bg_generated_v6b.jpg?t=1531138449",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Darksiders Warmastered Edition",
          "steam_appid": 462780,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Deceived by the forces of evil into prematurely bringing about the end of the world, War – the first Horseman of the Apocalypse – stands accused of breaking the sacred law by inciting a war between Heaven and Hell.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, Italian<strong>*</strong>, German<strong>*</strong>, Spanish - Spain<strong>*</strong>, Japanese<strong>*</strong>, Polish, Russian<strong>*</strong>, Czech, Korean, Portuguese - Brazil, Simplified Chinese<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/462780/header.jpg?t=1536302874",
          "website": null,
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 399,
            "discount_percent": 80
          },
          "packages": [
            101199,
            241375,
            81557,
            123985
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": null,
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 25,
              "description": "Adventure"
            },
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 3637
          },
          "release_date": {
            "coming_soon": false,
            "date": "Nov 29, 2016"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/462780/page_bg_generated_v6b.jpg?t=1536302874",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Mass Effect",
          "steam_appid": 17460,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "As Commander Shepard, you lead an elite squad on a heroic, action-packed adventure throughout the galaxy. Discover the imminent danger from an ancient threat and battle the traitorous Saren and his deadly army to save civilization. The fate of all life depends on your actions!",
          "supported_languages": "English, French, German, Spanish - Spain, Italian",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/17460/header.jpg?t=1447351599",
          "website": "http://masseffect.bioware.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1999,
            "discount_percent": 0
          },
          "packages": [
            1259,
            18260
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 89,
            "url": "https://www.metacritic.com/game/pc/mass-effect?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 9312
          },
          "release_date": {
            "coming_soon": false,
            "date": "Dec 19, 2008"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/17460/page_bg_generated_v6b.jpg?t=1447351599",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Mass Effect 2",
          "steam_appid": 24980,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "Recruit. Explore. Control.Two years after Commander Shepard repelled invading Reapers bent on the destruction of organic life, a mysterious new enemy has emerged. On the fringes of known space, something is silently abducting entire human colonies.",
          "supported_languages": "English, French, German, Czech, Hungarian, Italian, Polish, Russian, Spanish - Spain",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/24980/header.jpg?t=1447352739",
          "website": "http://masseffect.bioware.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1999,
            "discount_percent": 0
          },
          "packages": [
            2832,
            2833,
            18260
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 94,
            "url": "https://www.metacritic.com/game/pc/mass-effect-2?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            }
          ],
          "genres": [
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 9182
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jan 26, 2010"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/24980/page_bg_generated_v6b.jpg?t=1447352739",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Max Payne 3",
          "steam_appid": 204100,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "No longer a New York City cop, Max Payne moves to São Paulo to protect a wealthy family in an effort to finally escape his troubled past. Combining cutting edge shooting mechanics with a dark and twisted story, Max Payne 3 is a seamless, highly detailed, cinematic experience from Rockstar Games.",
          "supported_languages": "English<strong>*</strong>, French, German, Italian, Russian, Spanish - Spain, Polish, Japanese, Korean, Portuguese - Brazil<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/204100/header.jpg?t=1533709145",
          "website": "http://www.rockstargames.com/maxpayne3",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1999,
            "discount_percent": 0
          },
          "packages": [
            14906,
            18261,
            27273
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": false
          },
          "metacritic": {
            "score": 87,
            "url": "https://www.metacritic.com/game/pc/max-payne-3?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 19872
          },
          "release_date": {
            "coming_soon": false,
            "date": "May 31, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/204100/page_bg_generated_v6b.jpg?t=1533709145",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Super Hexagon",
          "steam_appid": 221640,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Super Hexagon is a minimal action game by Terry Cavanagh, with music by Chipzel.",
          "supported_languages": "English<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/221640/header.jpg?t=1531474399",
          "website": "http://www.superhexagon.com",
          "price_overview": {
            "currency": "USD",
            "initial": 299,
            "final": 200,
            "discount_percent": 33
          },
          "packages": [
            18358,
            18359
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 88,
            "url": "https://www.metacritic.com/game/pc/super-hexagon?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 28,
              "description": "Full controller support"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": {
            "total": 14340
          },
          "release_date": {
            "coming_soon": false,
            "date": "Nov 27, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/221640/page_bg_generated_v6b.jpg?t=1531474399",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Warhammer® 40,000: Dawn of War® - Game of the Year Edition",
          "steam_appid": 4570,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "Prepare yourself for the grim, dark future of the 41st millennium, where alien races battle mankind for galactic domination in a universe of unending war. Personalize your armies with a revolutionary unit customization tool that gives you the ability to choose your armies insignias, banners, squad colors and names.",
          "supported_languages": "English, French, German, Italian, Spanish - Spain",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/4570/header.jpg?t=1528131594",
          "website": "http://www.dawnofwar.com",
          "price_overview": {
            "currency": "USD",
            "initial": 1299,
            "final": 1299,
            "discount_percent": 0
          },
          "packages": [
            18609,
            30560,
            44370,
            116764
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 86,
            "url": "https://www.metacritic.com/game/pc/warhammer-40000-dawn-of-war?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 2212
          },
          "release_date": {
            "coming_soon": false,
            "date": "Aug 7, 2007"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/4570/page_bg_generated_v6b.jpg?t=1528131594",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Orcs Must Die! 2",
          "steam_appid": 201790,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "You’ve tossed, burned and sliced them by the thousands – now orcs must die more than ever before! Grab a friend and slay orcs in untold numbers in this sequel to the 2011 AIAS Strategy Game of the Year from Robot Entertainment.",
          "supported_languages": "English<strong>*</strong>, German<strong>*</strong>, French<strong>*</strong>, Italian<strong>*</strong>, Spanish - Spain<strong>*</strong>, Russian<strong>*</strong>, Japanese<strong>*</strong>, Polish<strong>*</strong>, Portuguese - Brazil<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/201790/header.jpg?t=1537484731",
          "website": "http://www.robotentertainment.com/games/omd2",
          "price_overview": {
            "currency": "USD",
            "initial": 1499,
            "final": 374,
            "discount_percent": 75
          },
          "packages": [
            15594,
            18202,
            17881
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 83,
            "url": "https://www.metacritic.com/game/pc/orcs-must-die!-2?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 8832
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jul 30, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/201790/page_bg_generated_v6b.jpg?t=1537484731",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Company of Heroes",
          "steam_appid": 228200,
          "required_age": 0,
          "is_free": true,
          "controller_support": null,
          "short_description": "Delivering a visceral WWII gaming experience, Company of Heroes redefines RTS by bringing the sacrifice of heroic soldiers, war-ravaged environments, and dynamic battlefields to life. Please visit the &quot;Company of Heroes - Legacy Edition&quot; page for additional user reviews.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, Italian, German<strong>*</strong>, Spanish - Spain, Czech, Japanese, Korean, Polish, Russian<strong>*</strong>, Traditional Chinese<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/228200/header.jpg?t=1521736892",
          "website": "http://www.companyofheroes.com",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1999,
            "discount_percent": 0
          },
          "packages": [
            403,
            1529,
            52874
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 93,
            "url": "https://www.metacritic.com/game/pc/company-of-heroes?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 73,
              "description": "Violent"
            },
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 1116
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 11, 2006"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/228200/page_bg_generated_v6b.jpg?t=1521736892",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        null,
        {
          "type": "game",
          "name": "Trine 2: Complete Story",
          "steam_appid": 35720,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Three Heroes make their way through dangers untold in a fairytale world, featuring physics-based puzzles, beautiful sights and online co-op.",
          "supported_languages": "English<strong>*</strong>, Finnish, French<strong>*</strong>, German<strong>*</strong>, Italian, Spanish - Spain<strong>*</strong>, Czech, Hungarian, Korean, Portuguese - Brazil, Romanian, Russian, Turkish, Polish, Traditional Chinese<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/35720/header.jpg?t=1539170815",
          "website": "http://www.trine2.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 299,
            "discount_percent": 85
          },
          "packages": [
            28315,
            28316,
            230360,
            28318,
            28377
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 84,
            "url": "https://www.metacritic.com/game/pc/trine-2?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 24,
              "description": "Shared/Split Screen"
            },
            {
              "id": 27,
              "description": "Cross-Platform Multiplayer"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 25,
              "description": "Adventure"
            },
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": {
            "total": 10937
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jun 6, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/35720/page_bg_generated_v6b.jpg?t=1539170815",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Antichamber",
          "steam_appid": 219890,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Antichamber is a mind-bending psychological exploration game where nothing can be taken for granted. Discover an Escher-like world where hallways wrap around upon each other, spaces reconfigure themselves, and accomplishing the impossible may just be the only way forward.",
          "supported_languages": "English<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/219890/header.jpg?t=1525832559",
          "website": "http://www.antichamber-game.com",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 799,
            "discount_percent": 60
          },
          "packages": [
            19223
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 82,
            "url": "https://www.metacritic.com/game/pc/antichamber?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            }
          ],
          "genres": [
            {
              "id": 25,
              "description": "Adventure"
            },
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": {
            "total": 8999
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jan 31, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/219890/page_bg_generated_v6b.jpg?t=1525832559",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "APB Reloaded",
          "steam_appid": 113400,
          "required_age": 17,
          "is_free": true,
          "controller_support": null,
          "short_description": "The world’s first and premier Action MMO Third Person Shooter allows you to choose between two sides of the law. Play as Enforcer or Criminal, customize your gear for the task at hand and hit the streets and play how you want in a city filled with more action this side of a Hollywood blockbuster.",
          "supported_languages": "English",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/113400/header.jpg?t=1527784750",
          "website": "http://www.apb.com/",
          "price_overview": null,
          "packages": null,
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": null,
          "categories": [
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 20,
              "description": "MMO"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 37,
              "description": "Free to Play"
            },
            {
              "id": 29,
              "description": "Massively Multiplayer"
            }
          ],
          "recommendations": {
            "total": 441
          },
          "release_date": {
            "coming_soon": false,
            "date": "Dec 6, 2011"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/113400/page_bg_generated_v6b.jpg?t=1527784750",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "PlanetSide 2",
          "steam_appid": 218230,
          "required_age": 0,
          "is_free": true,
          "controller_support": null,
          "short_description": "Join an all-out planetary war, where thousands of players battle as one in strategic, targeted missions against opposing empires. Utilize infantry, air and ground vehicles to destroy your enemies in this revolutionary, massive scale, first-person shooter.",
          "supported_languages": "English, German, French, Italian, Spanish - Spain",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/218230/header.jpg?t=1512086395",
          "website": "http://www.planetside2.com/",
          "price_overview": null,
          "packages": null,
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 84,
            "url": "https://www.metacritic.com/game/pc/planetside-2?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 20,
              "description": "MMO"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 37,
              "description": "Free to Play"
            },
            {
              "id": 29,
              "description": "Massively Multiplayer"
            }
          ],
          "recommendations": {
            "total": 706
          },
          "release_date": {
            "coming_soon": false,
            "date": "Nov 20, 2012"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/218230/page_bg_generated_v6b.jpg?t=1512086395",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Warframe",
          "steam_appid": 230410,
          "required_age": 17,
          "is_free": true,
          "controller_support": null,
          "short_description": "Warframe is a cooperative free-to-play third person online action game set in an evolving sci-fi world.",
          "supported_languages": "English<strong>*</strong>, German, French, Italian, Korean, Spanish - Spain, Simplified Chinese, Russian, Japanese, Polish, Portuguese - Brazil, Traditional Chinese, Turkish, Ukrainian<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/230410/header.jpg?t=1537907871",
          "website": "http://www.warframe.com",
          "price_overview": null,
          "packages": [
            199291
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 71,
            "url": "https://www.metacritic.com/game/pc/warframe?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 35,
              "description": "In-App Purchases"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 37,
              "description": "Free to Play"
            }
          ],
          "recommendations": {
            "total": 3179
          },
          "release_date": {
            "coming_soon": false,
            "date": "Mar 25, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/230410/page_bg_generated_v6b.jpg?t=1537907871",
          "content_descriptors": {
            "ids": [
              2,
              5
            ],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Cry of Fear",
          "steam_appid": 223710,
          "required_age": 0,
          "is_free": true,
          "controller_support": null,
          "short_description": "Cry of Fear is a psychological single-player and co-op horror game set in a deserted town filled with horrific creatures and nightmarish delusions. You play as a young man desperately searching for answers in the cold Scandinavian night, finding his way through the city as he slowly descends into madness.",
          "supported_languages": "English<strong>*</strong>, German, French, Spanish - Spain, Dutch, Norwegian, Swedish<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/223710/header.jpg?t=1447356887",
          "website": "http://www.cry-of-fear.com",
          "price_overview": null,
          "packages": null,
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": null,
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 8,
              "description": "Valve Anti-Cheat enabled"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 25,
              "description": "Adventure"
            },
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": {
            "total": 365
          },
          "release_date": {
            "coming_soon": false,
            "date": "Apr 25, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/223710/page_bg_generated_v6b.jpg?t=1447356887",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "War Thunder",
          "steam_appid": 236390,
          "required_age": 0,
          "is_free": true,
          "controller_support": null,
          "short_description": "War Thunder is the most comprehensive free-to-play, cross-platform, MMO military game for Windows, Linux, Mac and PlayStation®4 dedicated to aviation, armoured vehicles, and naval craft from World War II and the Cold War.",
          "supported_languages": "English<strong>*</strong>, German<strong>*</strong>, French<strong>*</strong>, Italian<strong>*</strong>, Spanish - Spain<strong>*</strong>, Simplified Chinese, Russian<strong>*</strong>, Japanese<strong>*</strong>, Polish<strong>*</strong>, Czech<strong>*</strong>, Turkish<strong>*</strong>, Portuguese, Korean, Portuguese - Brazil, Hungarian, Ukrainian<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/236390/header.jpg?t=1540820451",
          "website": "http://warthunder.com/",
          "price_overview": null,
          "packages": null,
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 81,
            "url": "https://www.metacritic.com/game/pc/war-thunder?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 20,
              "description": "MMO"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 27,
              "description": "Cross-Platform Multiplayer"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 35,
              "description": "In-App Purchases"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 37,
              "description": "Free to Play"
            },
            {
              "id": 29,
              "description": "Massively Multiplayer"
            },
            {
              "id": 28,
              "description": "Simulation"
            }
          ],
          "recommendations": {
            "total": 1753
          },
          "release_date": {
            "coming_soon": false,
            "date": "Aug 15, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/236390/page_bg_generated_v6b.jpg?t=1540820451",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Path of Exile",
          "steam_appid": 238960,
          "required_age": 0,
          "is_free": true,
          "controller_support": null,
          "short_description": "You are an Exile, struggling to survive on the dark continent of Wraeclast, as you fight to earn power that will allow you to exact your revenge against those who wronged you. Created by hardcore gamers, Path of Exile is an online Action RPG set in a dark fantasy world.",
          "supported_languages": "English<strong>*</strong>, Portuguese - Brazil, Russian, Thai, French, German, Spanish - Spain<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/238960/header.jpg?t=1535736265",
          "website": "http://www.pathofexile.com",
          "price_overview": null,
          "packages": [
            306042
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 86,
            "url": "https://www.metacritic.com/game/pc/path-of-exile?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 36,
              "description": "Online Multi-Player"
            },
            {
              "id": 20,
              "description": "MMO"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 35,
              "description": "In-App Purchases"
            }
          ],
          "genres": [
            {
              "id": 72,
              "description": "Nudity"
            },
            {
              "id": 73,
              "description": "Violent"
            },
            {
              "id": 74,
              "description": "Gore"
            },
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 25,
              "description": "Adventure"
            },
            {
              "id": 37,
              "description": "Free to Play"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 29,
              "description": "Massively Multiplayer"
            },
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 1171
          },
          "release_date": {
            "coming_soon": false,
            "date": "Oct 23, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/238960/page_bg_generated_v6b.jpg?t=1535736265",
          "content_descriptors": {
            "ids": [
              1,
              2,
              5
            ],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Sniper Elite: Nazi Zombie Army",
          "steam_appid": 227100,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "** Please note: a remastered and improved edition of this game is now available in Zombie Army Trilogy.**Featuring a co-op campaign for 1 to 4 players, Nazi Zombie Army is a horrifying new stand-alone expansion of the award-winning Sniper Elite series.",
          "supported_languages": "English, French, German, Italian, Spanish - Spain, Polish, Russian",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/227100/header.jpg?t=1478604623",
          "website": "http://www.rebellion.co.uk/nza",
          "price_overview": {
            "currency": "USD",
            "initial": 1499,
            "final": 374,
            "discount_percent": 75
          },
          "packages": [
            25560
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 62,
            "url": "https://www.metacritic.com/game/pc/sniper-elite-nazi-zombie-army?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 8,
              "description": "Valve Anti-Cheat enabled"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 2647
          },
          "release_date": {
            "coming_soon": false,
            "date": "Feb 28, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/227100/page_bg_generated_v6b.jpg?t=1478604623",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "DCS World Steam Edition",
          "steam_appid": 223750,
          "required_age": 0,
          "is_free": true,
          "controller_support": null,
          "short_description": "Feel the excitement of flying the Su-25T &quot;Frogfoot&quot; attack jet and the TF-51D &quot;Mustang&quot; in the free-to-play Digital Combat Simulator World!DCS World is a vehicle combat simulation game created by an inspired development team. DCS World uses a powerful engine that delivers realistic gameplay.",
          "supported_languages": "English<strong>*</strong>, German, Spanish - Spain, Russian<strong>*</strong>, Czech, French, Simplified Chinese<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/223750/header.jpg?t=1540392926",
          "website": "http://www.digitalcombatsimulator.com/en/",
          "price_overview": null,
          "packages": null,
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": null,
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 13,
              "description": "Captions available"
            },
            {
              "id": 31,
              "description": "VR Support"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            }
          ],
          "genres": [
            {
              "id": 37,
              "description": "Free to Play"
            },
            {
              "id": 28,
              "description": "Simulation"
            }
          ],
          "recommendations": {
            "total": 195
          },
          "release_date": {
            "coming_soon": false,
            "date": "Aug 2, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/223750/page_bg_generated_v6b.jpg?t=1540392926",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "No More Room in Hell",
          "steam_appid": 224260,
          "required_age": 0,
          "is_free": true,
          "controller_support": null,
          "short_description": "&quot;When there's no more room in hell, the dead will walk the earth.&quot;A tribute to the highly acclaimed film series in which the above quote originated from, No More Room in Hell (PC Gamer's Mod of the Year 2011, ModDB's Editor Choice Multiplayer Mod of the Year 2011), is a co-operative realistic first person survival horror...",
          "supported_languages": "English<strong>*</strong>, German, French, Japanese, Greek, Italian, Spanish - Spain, Hungarian, Russian, Swedish, Traditional Chinese, Ukrainian, Simplified Chinese<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/224260/header.jpg?t=1536391985",
          "website": "https://www.nomoreroominhell.com/",
          "price_overview": null,
          "packages": null,
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": null,
          "categories": [
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 27,
              "description": "Cross-Platform Multiplayer"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 13,
              "description": "Captions available"
            },
            {
              "id": 31,
              "description": "VR Support"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 8,
              "description": "Valve Anti-Cheat enabled"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            },
            {
              "id": 16,
              "description": "Includes Source SDK"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 37,
              "description": "Free to Play"
            },
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": {
            "total": 857
          },
          "release_date": {
            "coming_soon": false,
            "date": "Oct 31, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/224260/page_bg_generated_v6b.jpg?t=1536391985",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Sniper: Ghost Warrior",
          "steam_appid": 34830,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "As a Ghost Warrior, an elite sniper in a highly trained special ops unit, your unique skills in the art of stalking, target detection, surveillance and shooting accuracy will determine mission success.",
          "supported_languages": "English, French, German, Italian, Polish, Spanish - Spain",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/34830/header.jpg?t=1531733910",
          "website": "http://www.sniperghostwarrior.com",
          "price_overview": {
            "currency": "USD",
            "initial": 799,
            "final": 159,
            "discount_percent": 80
          },
          "packages": [
            11762,
            36904
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 55,
            "url": "https://www.metacritic.com/game/pc/sniper-ghost-warrior?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 1797
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jun 24, 2010"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/34830/page_bg_generated_v6b.jpg?t=1531733910",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Brutal Legend",
          "steam_appid": 225260,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Brütal Legend is an action-adventure that marries visceral action combat with open-world freedom. Set in a universe somewhere between Lord of the Rings and Spinal Tap, it’s a fresh take on the action/driving genre, which in this case is full of imitation cover bands, demons intent on enslaving humanity and Heavy metal tunes.",
          "supported_languages": "English<strong>*</strong>, German, French, Italian, Spanish - Spain<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/225260/header.jpg?t=1479167529",
          "website": "http://www.brutallegend.com",
          "price_overview": {
            "currency": "USD",
            "initial": 1499,
            "final": 374,
            "discount_percent": 75
          },
          "packages": [
            25920,
            25921
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 80,
            "url": "https://www.metacritic.com/game/pc/brutal-legend?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 25,
              "description": "Adventure"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 6794
          },
          "release_date": {
            "coming_soon": false,
            "date": "Feb 26, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/225260/page_bg_generated_v6b.jpg?t=1479167529",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Arma 3",
          "steam_appid": 107410,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "Experience true combat gameplay in a massive military sandbox. Deploying a wide variety of single- and multiplayer content, over 20 vehicles and 40 weapons, and limitless opportunities for content creation, this is the PC’s premier military game. Authentic, diverse, open - Arma 3 sends you to war.",
          "supported_languages": "English<strong>*</strong>, French, Italian, German, Spanish - Spain, Czech, Polish, Portuguese - Brazil, Russian, Japanese, Korean, Simplified Chinese, Traditional Chinese, Turkish<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/107410/header.jpg?t=1524502112",
          "website": "http://www.arma3.com",
          "price_overview": {
            "currency": "USD",
            "initial": 3999,
            "final": 1359,
            "discount_percent": 66
          },
          "packages": [
            31539,
            95419,
            45019,
            163922
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 74,
            "url": "http://www.metacritic.com/game/pc/arma-iii?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 36,
              "description": "Online Multi-Player"
            },
            {
              "id": 37,
              "description": "Local Multi-Player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 38,
              "description": "Online Co-op"
            },
            {
              "id": 39,
              "description": "Local Co-op"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 13,
              "description": "Captions available"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 28,
              "description": "Simulation"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 74705
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 12, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/107410/page_bg_generated_v6b.jpg?t=1524502112",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Age of Empires II HD",
          "steam_appid": 221380,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Age of Empires II has been re-imagined in high definition with new features, trading cards, improved AI, workshop support, multiplayer, Steamworks integration and more!",
          "supported_languages": "English<strong>*</strong>, German<strong>*</strong>, French<strong>*</strong>, Italian<strong>*</strong>, Korean<strong>*</strong>, Spanish - Spain<strong>*</strong>, Simplified Chinese<strong>*</strong>, Russian, Japanese, Dutch, Portuguese - Brazil<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/221380/header.jpg?t=1534437316",
          "website": "http://www.AgeofEmpires.com",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1999,
            "discount_percent": 0
          },
          "packages": [
            50789
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 68,
            "url": "https://www.metacritic.com/game/pc/age-of-empires-ii-hd-edition?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 13,
              "description": "Captions available"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 15,
              "description": "Stats"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            }
          ],
          "genres": [
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 40771
          },
          "release_date": {
            "coming_soon": false,
            "date": "Apr 9, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/221380/page_bg_generated_v6b.jpg?t=1534437316",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Cities in Motion 2",
          "steam_appid": 225420,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Cities in Motion 2 is the sequel to the popular mass transit simulation game Cities in Motion. Build, manage and lead your transportation network to provide cities with their ever changing needs. CIM2 introduces new features including multiplayer game modes, day and night cycles, timetables and dynamic cities.",
          "supported_languages": "English, German",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/225420/header.jpg?t=1447357009",
          "website": "http://www.citiesinmotion2.com",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 499,
            "discount_percent": 75
          },
          "packages": [
            26714,
            35268,
            35269
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 72,
            "url": "https://www.metacritic.com/game/pc/cities-in-motion-2?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 27,
              "description": "Cross-Platform Multiplayer"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            }
          ],
          "genres": [
            {
              "id": 28,
              "description": "Simulation"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 920
          },
          "release_date": {
            "coming_soon": false,
            "date": "Apr 2, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/225420/page_bg_generated_v6b.jpg?t=1447357009",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Kenshi",
          "steam_appid": 233860,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "A free-roaming squad based RPG. Focusing on open-ended sandbox gameplay features rather than a linear story. Be a trader, a thief, a rebel, a warlord, an adventurer, a farmer, a slave, or just food for the cannibals. Research new equipment and craft new gear.",
          "supported_languages": "English<strong>*</strong>, Spanish - Spain, Portuguese - Brazil<strong>*</strong>, Japanese<strong>*</strong>, German<strong>*</strong>, Russian<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/233860/header.jpg?t=1536668476",
          "website": "http://www.lofigames.com",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1999,
            "discount_percent": 0
          },
          "packages": [
            26224
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": null,
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 3,
              "description": "RPG"
            },
            {
              "id": 28,
              "description": "Simulation"
            },
            {
              "id": 2,
              "description": "Strategy"
            },
            {
              "id": 70,
              "description": "Early Access"
            }
          ],
          "recommendations": {
            "total": 5039
          },
          "release_date": {
            "coming_soon": false,
            "date": "Mar 20, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/233860/page_bg_generated_v6b.jpg?t=1536668476",
          "content_descriptors": {
            "ids": [
              2,
              5
            ],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "DLC Quest",
          "steam_appid": 230050,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "What happens when DLC practices go too far? An indie developer makes a game that mocks the industry and its foibles, that's what! Defeat the bad guy, save the world and get the girl! But first you'll need to find coins to buy DLC to enable animation, sound and even pausing.",
          "supported_languages": "English<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/230050/header.jpg?t=1478022164",
          "website": "http://www.dlcquest.com",
          "price_overview": {
            "currency": "USD",
            "initial": 299,
            "final": 149,
            "discount_percent": 50
          },
          "packages": [
            26380
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": false
          },
          "metacritic": null,
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            }
          ],
          "genres": [
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": {
            "total": 4939
          },
          "release_date": {
            "coming_soon": false,
            "date": "Mar 18, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/230050/page_bg_generated_v6b.jpg?t=1478022164",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        null,
        {
          "type": "game",
          "name": "Prison Architect",
          "steam_appid": 233450,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Build and Manage A Maximum Security Prison.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, Italian<strong>*</strong>, German<strong>*</strong>, Czech<strong>*</strong>, Finnish<strong>*</strong>, Korean<strong>*</strong>, Norwegian<strong>*</strong>, Polish<strong>*</strong>, Portuguese - Brazil<strong>*</strong>, Russian<strong>*</strong>, Simplified Chinese<strong>*</strong>, Spanish - Spain<strong>*</strong>, Bulgarian<strong>*</strong>, Danish<strong>*</strong>, Dutch<strong>*</strong>, Greek<strong>*</strong>, Hungarian<strong>*</strong>, Japanese<strong>*</strong>, Portuguese<strong>*</strong>, Romanian<strong>*</strong>, Swedish<strong>*</strong>, Thai<strong>*</strong>, Traditional Chinese<strong>*</strong>, Turkish<strong>*</strong>, Ukrainian<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/233450/header.jpg?t=1526998781",
          "website": "http://www.introversion.co.uk/prisonarchitect/",
          "price_overview": {
            "currency": "USD",
            "initial": 2999,
            "final": 749,
            "discount_percent": 75
          },
          "packages": [
            26394,
            26395,
            26396,
            26397,
            43954
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 83,
            "url": "https://www.metacritic.com/game/pc/prison-architect?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            }
          ],
          "genres": [
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 28,
              "description": "Simulation"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 26165
          },
          "release_date": {
            "coming_soon": false,
            "date": "Oct 6, 2015"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/233450/page_bg_generated_v6b.jpg?t=1526998781",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Poker Night at the Inventory",
          "steam_appid": 31280,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Prepare for a different kind of poker night in a very different kind of club and play against familiar faces!",
          "supported_languages": "English",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/31280/header.jpg?t=1495058773",
          "website": "http://www.telltalegames.com/pokernight",
          "price_overview": {
            "currency": "USD",
            "initial": 499,
            "final": 499,
            "discount_percent": 0
          },
          "packages": [
            6647
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": false
          },
          "metacritic": {
            "score": 71,
            "url": "https://www.metacritic.com/game/pc/poker-night-at-the-inventory?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            }
          ],
          "genres": [
            {
              "id": 4,
              "description": "Casual"
            },
            {
              "id": 18,
              "description": "Sports"
            }
          ],
          "recommendations": {
            "total": 5201
          },
          "release_date": {
            "coming_soon": false,
            "date": "Nov 22, 2010"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/31280/page_bg_generated_v6b.jpg?t=1495058773",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Surgeon Simulator",
          "steam_appid": 233720,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Surgeon Simulator is an over-the-top operation sim, stitching together pitch-black humour with life-saving surgery. Become Dr. Burke, a would-be surgeon with a less than conventional toolkit, as he performs procedures on patients including none other than Donald Trump, himself! ...is that a hammer?",
          "supported_languages": "English<strong>*</strong>, French, Italian, German, Spanish - Spain, Danish, Dutch, Finnish, Norwegian, Polish, Portuguese - Brazil, Russian, Swedish<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/233720/header.jpg?t=1526556372",
          "website": "http://www.surgeonsim.com",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 149,
            "discount_percent": 85
          },
          "packages": [
            26827,
            81729
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 71,
            "url": "https://www.metacritic.com/game/pc/surgeon-simulator-2013?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 28,
              "description": "Simulation"
            }
          ],
          "recommendations": {
            "total": 10867
          },
          "release_date": {
            "coming_soon": false,
            "date": "Apr 19, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/233720/page_bg_generated_v6b.jpg?t=1526556372",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Wargame: Airland Battle",
          "steam_appid": 222750,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "2 SIDES, 12 NATIONS, 750 UNITS: THE STRATEGY GAME REFERENCE IS BACK! Richer, more beautiful and more accessible, Wargame AirLand Battle is the sequel to the explosive real-time strategy game Wargame European Escalation! 1985.",
          "supported_languages": "English, German, French, Italian, Spanish - Spain, Russian, Polish, Traditional Chinese",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/222750/header.jpg?t=1505207837",
          "website": "http://wargame-ab.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1999,
            "discount_percent": 0
          },
          "packages": [
            27202
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 80,
            "url": "https://www.metacritic.com/game/pc/wargame-airland-battle?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 27,
              "description": "Cross-Platform Multiplayer"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 2921
          },
          "release_date": {
            "coming_soon": false,
            "date": "May 29, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/222750/page_bg_generated_v6b.jpg?t=1505207837",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Sanctum 2",
          "steam_appid": 210770,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Sanctum 2 is the sequel to the world’s first Tower Defense/FPS hybrid game. Pick from four unique character classes and embark on a mission to protect the oxygen-producing Cores from hordes of deadly aliens who are threatened by their existence.",
          "supported_languages": "English<strong>*</strong>, German, French, Italian, Spanish - Spain, Russian<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/210770/header.jpg?t=1501885527",
          "website": null,
          "price_overview": {
            "currency": "USD",
            "initial": 1499,
            "final": 374,
            "discount_percent": 75
          },
          "packages": [
            27722,
            27724
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 77,
            "url": "https://www.metacritic.com/game/pc/sanctum-2?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 6436
          },
          "release_date": {
            "coming_soon": false,
            "date": "May 15, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/210770/page_bg_generated_v6b.jpg?t=1501885527",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Sid Meier's Civilization® III Complete",
          "steam_appid": 3910,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Sid Meier's Civilization III: Complete, the latest offering in the Sid Meier's Civilization III franchise, provides gaming fans with Sid Meier's Civilization III, the highly-addictive journey of discovery.",
          "supported_languages": "English",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/3910/header.jpg?t=1534462914",
          "website": "http://www.civ3.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 499,
            "final": 499,
            "discount_percent": 0
          },
          "packages": [
            193
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 90,
            "url": "https://www.metacritic.com/game/pc/sid-meiers-civilization-iii?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            }
          ],
          "genres": [
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 1612
          },
          "release_date": {
            "coming_soon": false,
            "date": "Oct 25, 2006"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/3910/page_bg_generated_v6b.jpg?t=1534462914",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Don't Starve",
          "steam_appid": 219740,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Don’t Starve is an uncompromising wilderness survival game full of science and magic. Enter a strange and unexplored world full of strange creatures, dangers, and surprises. Gather resources to craft items and structures that match your survival style.",
          "supported_languages": "English<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/219740/header.jpg?t=1505326169",
          "website": "http://www.dontstarvegame.com",
          "price_overview": {
            "currency": "USD",
            "initial": 1499,
            "final": 1499,
            "discount_percent": 0
          },
          "packages": [
            67579
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 79,
            "url": "https://www.metacritic.com/game/pc/dont-starve?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 25,
              "description": "Adventure"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 28,
              "description": "Simulation"
            }
          ],
          "recommendations": {
            "total": 45799
          },
          "release_date": {
            "coming_soon": false,
            "date": ""
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/219740/page_bg_generated_v6b.jpg?t=1505326169",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "FEZ",
          "steam_appid": 224760,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Gomez is a 2D creature living in a 2D world. Or is he? When the existence of a mysterious 3rd dimension is revealed to him, Gomez is sent out on a journey that will take him to the very end of time and space. Use your ability to navigate 3D structures from 4 distinct classic 2D perspectives.",
          "supported_languages": "English, German, French, Italian, Korean, Spanish - Spain, Traditional Chinese, Japanese, Portuguese",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/224760/header.jpg?t=1472521163",
          "website": "http://www.fezgame.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 749,
            "discount_percent": 25
          },
          "packages": [
            27186,
            27436
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 91,
            "url": "https://www.metacritic.com/game/pc/fez?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            }
          ],
          "genres": [
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": {
            "total": 7489
          },
          "release_date": {
            "coming_soon": false,
            "date": "May 1, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/224760/page_bg_generated_v6b.jpg?t=1472521163",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Don't Starve Together",
          "steam_appid": 322330,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Don't Starve Together is the standalone multiplayer expansion of the uncompromising survival game Don't Starve.",
          "supported_languages": "English<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/322330/header.jpg?t=1540592227",
          "website": "http://www.dontstarvegame.com",
          "price_overview": {
            "currency": "USD",
            "initial": 1499,
            "final": 599,
            "discount_percent": 60
          },
          "packages": [
            68179
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 83,
            "url": "https://www.metacritic.com/game/pc/dont-starve-together?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 27,
              "description": "Cross-Platform Multiplayer"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            }
          ],
          "genres": [
            {
              "id": 25,
              "description": "Adventure"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 28,
              "description": "Simulation"
            }
          ],
          "recommendations": {
            "total": 57010
          },
          "release_date": {
            "coming_soon": false,
            "date": "Apr 21, 2016"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/322330/page_bg_generated_v6b.jpg?t=1540592227",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Kerbal Space Program",
          "steam_appid": 220200,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Kerbal Space Program 1.5: Dressed for Success is now available.With this update both the base game and the expansion are getting their share of enhancements. With that in mind, a key aspect in this update is the optimization and fresh makeover of various parts, as well the improvement of the burn time indicator!",
          "supported_languages": "English, Spanish - Spain, Simplified Chinese, Japanese, Russian, French, Italian, German, Portuguese - Brazil",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/220200/header.jpg?t=1540575521",
          "website": "https://kerbalspaceprogram.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 3999,
            "final": 1599,
            "discount_percent": 60
          },
          "packages": [
            27437
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 88,
            "url": "https://www.metacritic.com/game/pc/kerbal-space-program?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 28,
              "description": "Simulation"
            }
          ],
          "recommendations": {
            "total": 41965
          },
          "release_date": {
            "coming_soon": false,
            "date": "Apr 27, 2015"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/220200/page_bg_generated_v6b.jpg?t=1540575521",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Anomaly 2",
          "steam_appid": 236730,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Anomaly 2 is a sequel to the critically acclaimed Anomaly Warzone Earth. Maintaining the core elements of the original, Anomaly 2 adds plenty of new features: unit morphing, over million tactical combinations, post-apo world and tower defense vs tower offense multiplayer mode.",
          "supported_languages": "English<strong>*</strong>, French, German, Spanish - Spain, Polish, Russian<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/236730/header.jpg?t=1539252885",
          "website": "http://www.anomaly2game.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1499,
            "final": 224,
            "discount_percent": 85
          },
          "packages": [
            27306,
            27388
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 77,
            "url": "https://www.metacritic.com/game/pc/anomaly-2?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 27,
              "description": "Cross-Platform Multiplayer"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 218
          },
          "release_date": {
            "coming_soon": false,
            "date": "May 15, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/236730/page_bg_generated_v6b.jpg?t=1539252885",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Reus",
          "steam_appid": 222730,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "In Reus, you control powerful giants to shape the planet to your will. You can create mountains, oceans, forests and more. Enrich your planet with plants, minerals and animal life. There is only one thing on the planet that you do not control: mankind, with all their virtues and and all their vices.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, Italian<strong>*</strong>, Spanish - Spain<strong>*</strong>, Dutch<strong>*</strong>, Portuguese - Brazil<strong>*</strong>, German<strong>*</strong>, Simplified Chinese<strong>*</strong>, Russian<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/222730/header.jpg?t=1526576195",
          "website": "http://www.reusgame.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 399,
            "discount_percent": 60
          },
          "packages": [
            27693,
            232991
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 75,
            "url": "https://www.metacritic.com/game/pc/reus?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            }
          ],
          "genres": [
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 28,
              "description": "Simulation"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 3461
          },
          "release_date": {
            "coming_soon": false,
            "date": "May 16, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/222730/page_bg_generated_v6b.jpg?t=1526576195",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "PAYDAY 2",
          "steam_appid": 218620,
          "required_age": 18,
          "is_free": false,
          "controller_support": "full",
          "short_description": "PAYDAY 2 is an action-packed, four-player co-op shooter that once again lets gamers don the masks of the original PAYDAY crew - Dallas, Hoxton, Wolf and Chains - as they descend on Washington DC for an epic crime spree.",
          "supported_languages": "English<strong>*</strong>, German, French, Italian, Spanish - Spain, Dutch, Russian<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/218620/header.jpg?t=1540499986",
          "website": "http://www.overkillsoftware.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 499,
            "discount_percent": 50
          },
          "packages": [
            30182
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": true
          },
          "metacritic": {
            "score": 79,
            "url": "https://www.metacritic.com/game/pc/payday-2?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 38,
              "description": "Online Co-op"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 35,
              "description": "In-App Purchases"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 205141
          },
          "release_date": {
            "coming_soon": false,
            "date": "Aug 13, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/218620/page_bg_generated_v6b.jpg?t=1540499986",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "The Forest",
          "steam_appid": 242760,
          "required_age": 18,
          "is_free": false,
          "controller_support": null,
          "short_description": "As the lone survivor of a passenger jet crash, you find yourself in a mysterious forest battling to stay alive against a society of cannibalistic mutants. Build, explore, survive in this terrifying first person survival horror simulator.",
          "supported_languages": "English<strong>*</strong>, French, German, Czech, Finnish, Japanese, Korean, Polish, Portuguese - Brazil, Russian, Simplified Chinese, Swedish, Traditional Chinese, Turkish, Italian, Spanish - Spain<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/242760/header.jpg?t=1527008565",
          "website": "http://survivetheforest.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1339,
            "discount_percent": 33
          },
          "packages": [
            28497,
            297407
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 83,
            "url": "https://www.metacritic.com/game/pc/the-forest?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 25,
              "description": "Adventure"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 28,
              "description": "Simulation"
            }
          ],
          "recommendations": {
            "total": 88800
          },
          "release_date": {
            "coming_soon": false,
            "date": "Apr 30, 2018"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/242760/page_bg_generated_v6b.jpg?t=1527008565",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Guncraft",
          "steam_appid": 241720,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Block and Load! Combining the addictive nature of block building sandbox games with the speed and competition of modern first-person shooters, Guncraft takes voxel-based gaming to a whole new level. Players can create maps and arenas based on anything imaginable and, once complete, can utterly destroy them with bullets, bombs, grenades,...",
          "supported_languages": "English, French, Italian, German, Spanish - Spain",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/241720/header.jpg?t=1525801744",
          "website": "http://www.exatogames.com/Guncraft/",
          "price_overview": {
            "currency": "USD",
            "initial": 1499,
            "final": 1499,
            "discount_percent": 0
          },
          "packages": [
            28251,
            30140
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 73,
            "url": "https://www.metacritic.com/game/pc/guncraft?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": {
            "total": 830
          },
          "release_date": {
            "coming_soon": false,
            "date": "Aug 9, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/241720/page_bg_generated_v6b.jpg?t=1525801744",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Sir, You Are Being Hunted",
          "steam_appid": 242880,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Sir, You Are Being Hunted is a freedom sandbox stealth experience, where each playthrough is unique, thanks to our British Countryside Generator. Escape from these robot-infested islands with violence, trickery and stealth. This brutally funny game is available for Windows, OSX, and Linux.",
          "supported_languages": "English<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/242880/header.jpg?t=1447358095",
          "website": "http://www.big-robot.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 399,
            "discount_percent": 80
          },
          "packages": [
            28515
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 63,
            "url": "https://www.metacritic.com/game/pc/sir-you-are-being-hunted?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 15,
              "description": "Stats"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": {
            "total": 2636
          },
          "release_date": {
            "coming_soon": false,
            "date": "May 2, 2014"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/242880/page_bg_generated_v6b.jpg?t=1447358095",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Banished",
          "steam_appid": 242920,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "In this city-building strategy game, you control a group of exiled travelers who decide to restart their lives in a new land. They have only the clothes on their backs and a cart filled with supplies from their homeland. The townspeople of Banished are your primary resource.",
          "supported_languages": "English<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/242920/header.jpg?t=1447358097",
          "website": "http://www.shiningrocksoftware.com",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1999,
            "discount_percent": 0
          },
          "packages": [
            28521
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": null,
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            }
          ],
          "genres": [
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 28,
              "description": "Simulation"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": {
            "total": 22952
          },
          "release_date": {
            "coming_soon": false,
            "date": "Feb 18, 2014"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/242920/page_bg_generated_v6b.jpg?t=1447358097",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Interstellar Marines",
          "steam_appid": 236370,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "UPDATE 27 AVAILABLE - Interstellar Marines is an immersive tactical sci-fi First Person Simulator in the making, offering a unique blend of tactical gameplay, dynamic environments and non-scriptet AI. Play Singleplayer or Co-op/PvP on servers around the world.",
          "supported_languages": "English<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/236370/header.jpg?t=1516985232",
          "website": "http://www.InterstellarMarines.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 499,
            "discount_percent": 50
          },
          "packages": [
            28453,
            50833,
            28454,
            28455
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": null,
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 27,
              "description": "Cross-Platform Multiplayer"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 15,
              "description": "Stats"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 3,
              "description": "RPG"
            },
            {
              "id": 28,
              "description": "Simulation"
            },
            {
              "id": 70,
              "description": "Early Access"
            }
          ],
          "recommendations": {
            "total": 3786
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jul 2, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/236370/page_bg_generated_v6b.jpg?t=1516985232",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        null,
        {
          "type": "game",
          "name": "Mercenary Kings: Reloaded Edition",
          "steam_appid": 218820,
          "required_age": 12,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Craft your arsenal to avenge your fallen comrades and save the world from the fearsome forces of CLAW!",
          "supported_languages": "English<strong>*</strong>, French, Japanese<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/218820/header.jpg?t=1517939314",
          "website": "http://mercenarykings.com",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 999,
            "discount_percent": 50
          },
          "packages": [
            29345,
            29347
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 76,
            "url": "https://www.metacritic.com/game/pc/mercenary-kings?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 24,
              "description": "Shared/Split Screen"
            },
            {
              "id": 27,
              "description": "Cross-Platform Multiplayer"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 25,
              "description": "Adventure"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 1046
          },
          "release_date": {
            "coming_soon": false,
            "date": "Mar 25, 2014"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/218820/page_bg_generated_v6b.jpg?t=1517939314",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Medal of Honor™",
          "steam_appid": 47790,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "This is a new war. There is a new warrior. He is Tier 1.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, German<strong>*</strong>, Italian<strong>*</strong>, Spanish - Spain<strong>*</strong>, Polish, Russian, Traditional Chinese<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/47790/header.jpg?t=1447353177",
          "website": "http://www.medalofhonor.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1999,
            "discount_percent": 0
          },
          "packages": [
            8988
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 72,
            "url": "https://www.metacritic.com/game/pc/medal-of-honor?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 1886
          },
          "release_date": {
            "coming_soon": false,
            "date": "Oct 12, 2010"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/47790/page_bg_generated_v6b.jpg?t=1447353177",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Medal of Honor™",
          "steam_appid": 47790,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "This is a new war. There is a new warrior. He is Tier 1.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, German<strong>*</strong>, Italian<strong>*</strong>, Spanish - Spain<strong>*</strong>, Polish, Russian, Traditional Chinese<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/47790/header.jpg?t=1447353177",
          "website": "http://www.medalofhonor.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1999,
            "discount_percent": 0
          },
          "packages": [
            8988
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 72,
            "url": "https://www.metacritic.com/game/pc/medal-of-honor?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            }
          ],
          "recommendations": {
            "total": 1886
          },
          "release_date": {
            "coming_soon": false,
            "date": "Oct 12, 2010"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/47790/page_bg_generated_v6b.jpg?t=1447353177",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Space Engineers",
          "steam_appid": 244850,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Space Engineers is a sandbox game about engineering, construction, exploration and survival in space and on planets. Players build space ships, space stations, planetary outposts of various sizes and uses, pilot ships and travel through space to explore planets and gather resources to survive.",
          "supported_languages": "English, German, Spanish - Spain, Czech, Danish, Dutch, Polish, French, Italian, Finnish, Hungarian, Norwegian, Portuguese - Brazil, Swedish, Russian, Simplified Chinese",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/244850/header.jpg?t=1534347384",
          "website": "http://www.SpaceEngineersGame.com",
          "price_overview": {
            "currency": "USD",
            "initial": 2499,
            "final": 999,
            "discount_percent": 60
          },
          "packages": [
            28952,
            37359,
            59400
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": null,
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 28,
              "description": "Simulation"
            },
            {
              "id": 2,
              "description": "Strategy"
            },
            {
              "id": 70,
              "description": "Early Access"
            }
          ],
          "recommendations": {
            "total": 49084
          },
          "release_date": {
            "coming_soon": false,
            "date": "Oct 23, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/244850/page_bg_generated_v6b.jpg?t=1534347384",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "ENSLAVED™: Odyssey to the West™ Premium Edition",
          "steam_appid": 245280,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Follow a gripping, surprise-filled journey as two dissimilar characters form an uneasy partnership in order to survive through a perilous, post-apocalyptic America. 150 years in the future, war and destruction have left the world in ruins with few humans remaining and nature having reclaimed the world.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, Italian<strong>*</strong>, German<strong>*</strong>, Spanish - Spain<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/245280/header.jpg?t=1485885624",
          "website": "http://enslaved.uk.namcobandaigames.eu/",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1999,
            "discount_percent": 0
          },
          "packages": [
            30287
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
          },
          "metacritic": {
            "score": 70,
            "url": "https://www.metacritic.com/game/pc/enslaved-odyssey-to-the-west?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 25,
              "description": "Adventure"
            }
          ],
          "recommendations": {
            "total": 2979
          },
          "release_date": {
            "coming_soon": false,
            "date": "Oct 24, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/245280/page_bg_generated_v6b.jpg?t=1485885624",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Eets Munchies",
          "steam_appid": 214550,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "A beautiful puzzle game for the whole family!Eets Munchies is a reimagining of the award-winning puzzle game by Klei Entertainment. Featuring gorgeous animation and ridiculous creatures, players help an adorable hungry creature devour cake in increasingly devious puzzles.",
          "supported_languages": "English",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/214550/header.jpg?t=1477409200",
          "website": "http://www.eetsgame.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 699,
            "final": 174,
            "discount_percent": 75
          },
          "packages": [
            39965
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": null,
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 17,
              "description": "Includes level editor"
            }
          ],
          "genres": [
            {
              "id": 4,
              "description": "Casual"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 28,
              "description": "Simulation"
            },
            {
              "id": 2,
              "description": "Strategy"
            }
          ],
          "recommendations": null,
          "release_date": {
            "coming_soon": false,
            "date": "Mar 11, 2014"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/214550/page_bg_generated_v6b.jpg?t=1477409200",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Jazzpunk: Director's Cut",
          "steam_appid": 250260,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Jazzpunk is a comedy adventure set in an alternate reality Cold War World, plagued with corporate espionage, CyberCrime, and sentient martinis. Gameplay is inspired by spoof comedy films and cartoons of yesteryear, with a focus on weird gadgets, exotic locales, and open-world style exploration.",
          "supported_languages": "English<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/250260/header.jpg?t=1497707920",
          "website": "http://www.jazzpunk.net",
          "price_overview": {
            "currency": "USD",
            "initial": 1499,
            "final": 374,
            "discount_percent": 75
          },
          "packages": [
            30442
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 75,
            "url": "https://www.metacritic.com/game/pc/jazzpunk?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            }
          ],
          "genres": [
            {
              "id": 25,
              "description": "Adventure"
            },
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": {
            "total": 3012
          },
          "release_date": {
            "coming_soon": false,
            "date": "Feb 7, 2014"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/250260/page_bg_generated_v6b.jpg?t=1497707920",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Lovers in a Dangerous Spacetime",
          "steam_appid": 252110,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Explore a neon galaxy in your very own battleship in this 1- to 4-player couch co-op adventure.",
          "supported_languages": "English, French, Italian, German, Spanish - Spain, Japanese, Korean, Portuguese - Brazil, Russian, Simplified Chinese, Traditional Chinese",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/252110/header.jpg?t=1488222341",
          "website": "http://www.loversinadangerousspacetime.com",
          "price_overview": {
            "currency": "USD",
            "initial": 1499,
            "final": 749,
            "discount_percent": 50
          },
          "packages": [
            30822
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 80,
            "url": "https://www.metacritic.com/game/pc/lovers-in-a-dangerous-spacetime?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 24,
              "description": "Shared/Split Screen"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 28,
              "description": "Simulation"
            }
          ],
          "recommendations": {
            "total": 1314
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 9, 2015"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/252110/page_bg_generated_v6b.jpg?t=1488222341",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Saints Row IV",
          "steam_appid": 206420,
          "required_age": 17,
          "is_free": false,
          "controller_support": "full",
          "short_description": "The US President must save the Earth from alien overlord Zinyak using an arsenal of superpowers and strange weapons in the wildest open world game ever.",
          "supported_languages": "English<strong>*</strong>, French, German, Italian, Spanish - Spain, Polish, Russian, Japanese<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/206420/header.jpg?t=1533713017",
          "website": "http://www.saintsrow.com",
          "price_overview": {
            "currency": "USD",
            "initial": 1499,
            "final": 1499,
            "discount_percent": 0
          },
          "packages": [
            30397,
            47804
          ],
          "platforms": {
            "windows": true,
            "mac": false,
            "linux": true
          },
          "metacritic": {
            "score": 86,
            "url": "https://www.metacritic.com/game/pc/saints-row-iv?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 25,
              "description": "Adventure"
            }
          ],
          "recommendations": {
            "total": 40249
          },
          "release_date": {
            "coming_soon": false,
            "date": "Aug 19, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/206420/page_bg_generated_v6b.jpg?t=1533713017",
          "content_descriptors": {
            "ids": [
              5
            ],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Rust",
          "steam_appid": 252490,
          "required_age": 17,
          "is_free": false,
          "controller_support": null,
          "short_description": "The only aim in Rust is to survive. To do this you will need to overcome struggles such as hunger, thirst and cold. Build a fire. Build a shelter. Kill animals for meat. Protect yourself from other players, and kill them for meat. Create alliances with other players and form a town. Do whatever it takes to survive.",
          "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, Italian<strong>*</strong>, German<strong>*</strong>, Spanish - Spain<strong>*</strong>, Japanese<strong>*</strong>, Korean<strong>*</strong>, Russian<strong>*</strong>, Simplified Chinese<strong>*</strong>, Ukrainian<strong>*</strong><br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/252490/header.jpg?t=1538647482",
          "website": "http://rust.facepunch.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 3499,
            "final": 1749,
            "discount_percent": 50
          },
          "packages": [
            244390
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": false
          },
          "metacritic": {
            "score": 69,
            "url": "https://www.metacritic.com/game/pc/rust?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 36,
              "description": "Online Multi-Player"
            },
            {
              "id": 20,
              "description": "MMO"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 38,
              "description": "Online Co-op"
            },
            {
              "id": 27,
              "description": "Cross-Platform Multiplayer"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 35,
              "description": "In-App Purchases"
            },
            {
              "id": 8,
              "description": "Valve Anti-Cheat enabled"
            },
            {
              "id": 15,
              "description": "Stats"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 25,
              "description": "Adventure"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 29,
              "description": "Massively Multiplayer"
            },
            {
              "id": 3,
              "description": "RPG"
            }
          ],
          "recommendations": {
            "total": 185230
          },
          "release_date": {
            "coming_soon": false,
            "date": "Feb 8, 2018"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/252490/page_bg_generated_v6b.jpg?t=1538647482",
          "content_descriptors": {
            "ids": [
              1,
              2,
              5
            ],
            "notes": null
          }
        },
        null,
        null,
        null,
        {
          "type": "game",
          "name": "Rocket League®",
          "steam_appid": 252950,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Soccer meets driving once again in the long-awaited, physics-based multiplayer-focused sequel to Supersonic Acrobatic Rocket-Powered Battle-Cars! Choose a variety of high-flying vehicles equipped with huge rocket boosters to score amazing aerial goals and pull-off incredible game-changing saves!",
          "supported_languages": "English, French, Italian, German, Spanish - Spain, Dutch, Portuguese, Japanese, Korean, Russian, Turkish, Polish",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/252950/header_alt_assets_4.jpg?t=1539663459",
          "website": "http://www.rocketleague.com/",
          "price_overview": {
            "currency": "USD",
            "initial": 1999,
            "final": 1199,
            "discount_percent": 40
          },
          "packages": [
            30948,
            140146,
            224114
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 86,
            "url": "https://www.metacritic.com/game/pc/rocket-league?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 24,
              "description": "Shared/Split Screen"
            },
            {
              "id": 27,
              "description": "Cross-Platform Multiplayer"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 30,
              "description": "Steam Workshop"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 15,
              "description": "Stats"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 9,
              "description": "Racing"
            },
            {
              "id": 18,
              "description": "Sports"
            }
          ],
          "recommendations": {
            "total": 164038
          },
          "release_date": {
            "coming_soon": false,
            "date": "Jul 7, 2015"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/252950/page_bg_generated_v6b.jpg?t=1539663459",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "Skullgirls",
          "steam_appid": 245170,
          "required_age": 0,
          "is_free": false,
          "controller_support": "full",
          "short_description": "Skullgirls is a fast-paced 2-D fighting game that puts players in control of fierce warriors in an extraordinary Dark Deco world. Featuring all-new game systems which test the skills of veteran fighting game fans while also making the genre enjoyable and accessible to newcomers.",
          "supported_languages": "English<strong>*</strong>, French, Italian, German, Spanish - Spain, Japanese, Portuguese - Brazil<br><strong>*</strong>languages with full audio support",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/245170/header.jpg?t=1516345108",
          "website": "http://www.skullgirls.com",
          "price_overview": {
            "currency": "USD",
            "initial": 999,
            "final": 299,
            "discount_percent": 70
          },
          "packages": [
            31087,
            31440,
            31446
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": {
            "score": 83,
            "url": "https://www.metacritic.com/game/pc/skullgirls?ftag=MCD-06-10aaa1f"
          },
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 1,
              "description": "Multi-player"
            },
            {
              "id": 22,
              "description": "Steam Achievements"
            },
            {
              "id": 28,
              "description": "Full controller support"
            },
            {
              "id": 29,
              "description": "Steam Trading Cards"
            },
            {
              "id": 23,
              "description": "Steam Cloud"
            },
            {
              "id": 25,
              "description": "Steam Leaderboards"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 23,
              "description": "Indie"
            }
          ],
          "recommendations": {
            "total": 9358
          },
          "release_date": {
            "coming_soon": false,
            "date": "Aug 22, 2013"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/245170/page_bg_generated_v6b.jpg?t=1516345108",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        },
        {
          "type": "game",
          "name": "PULSAR: Lost Colony",
          "steam_appid": 252870,
          "required_age": 0,
          "is_free": false,
          "controller_support": null,
          "short_description": "Team up to operate an advanced starship and explore a randomized galaxy falling into chaos. Each player (up to five) takes on a unique role and must work together in order to find the Lost Colony.",
          "supported_languages": "English",
          "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/252870/header.jpg?t=1529438003",
          "website": "http://www.pulsarthegame.com",
          "price_overview": {
            "currency": "USD",
            "initial": 2499,
            "final": 1499,
            "discount_percent": 40
          },
          "packages": [
            30936
          ],
          "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
          },
          "metacritic": null,
          "categories": [
            {
              "id": 2,
              "description": "Single-player"
            },
            {
              "id": 9,
              "description": "Co-op"
            },
            {
              "id": 38,
              "description": "Online Co-op"
            },
            {
              "id": 27,
              "description": "Cross-Platform Multiplayer"
            },
            {
              "id": 18,
              "description": "Partial Controller Support"
            }
          ],
          "genres": [
            {
              "id": 1,
              "description": "Action"
            },
            {
              "id": 25,
              "description": "Adventure"
            },
            {
              "id": 23,
              "description": "Indie"
            },
            {
              "id": 28,
              "description": "Simulation"
            },
            {
              "id": 70,
              "description": "Early Access"
            }
          ],
          "recommendations": {
            "total": 1627
          },
          "release_date": {
            "coming_soon": false,
            "date": "Sep 15, 2015"
          },
          "background": "https://steamcdn-a.akamaihd.net/steam/apps/252870/page_bg_generated_v6b.jpg?t=1529438003",
          "content_descriptors": {
            "ids": [],
            "notes": null
          }
        }
      ];
    } 
  }