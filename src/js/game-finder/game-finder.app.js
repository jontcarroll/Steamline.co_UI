class GameFinderApp {
    constructor(apiPaths) {
      this.baseUrl = apiPaths.api;
      riot.observable(this);

      this.on('wsOnMessage', this.wsOnMessage);

      this.preferences = {};

      this.getGames();
      this.getPreferences();

      const steamUrl = Cookies.get(api.helpers.STEAM_URL_COOKIE_NAME);

      socket.open((message) => {
        this.trigger('wsOnMessage', message);
      });

      riot.mount('game-finder-app', { app: this });
    }

    wsOnMessage(response) {
      if (response.message.wsMessageType === 'updatePreferences') {
        this.trigger('preferencesUpdated', response.message);
      }
    }

    scoreGames() {

    }

    updatePreferences(preferences) {
      this.preferences = preferences;
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
      this.wsSendMessage({
        type: 'updatePreferences',
        message: this.preferences
      });
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

      this.wsSendMessage({
        type: 'updatePreferences',
        message: this.preferences
      });
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
      this.wsSendMessage({
        type: 'updatePreferences',
        message: this.preferences
      });
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
      this.wsSendMessage({
        type: 'updatePreferences',
        message: this.preferences
      });
    }

    wsSendMessage(params) {
      socket.sendMessage(params);
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
        }
      ];
    } 
  }