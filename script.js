(function(){
    var script = {
 "mouseWheelEnabled": true,
 "layout": "absolute",
 "start": "this.init(); this.syncPlaylists([this.DropDown_76BC1297_6992_47B3_41D5_DBE480A6EDAD_playlist,this.DropDown_0561BA16_3AA3_A1D2_41C7_FDA0B6E9EE29_playlist,this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist,this.DropDown_05783A1F_3AA3_A1D2_41A6_E88282E5373B_playlist,this.DropDown_057BFA20_3AA3_A1EE_41A9_8EE569D894A7_playlist,this.mainPlayList])",
 "scrollBarWidth": 10,
 "id": "rootPlayer",
 "vrPolyfillScale": 0.5,
 "propagateClick": true,
 "desktopMipmappingEnabled": false,
 "mobileMipmappingEnabled": false,
 "paddingLeft": 0,
 "backgroundPreloadEnabled": true,
 "scrollBarColor": "#000000",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minWidth": 20,
 "children": [
  "this.MainViewer",
  "this.Container_1B9AAD00_16C4_0505_41B5_6F4AE0747E48",
  "this.Container_0A760F11_3BA1_BFAE_41CD_32268FCAF8B4",
  "this.Container_1B99BD00_16C4_0505_41A4_A3C2452B0288",
  "this.Image_7AC4751F_69BE_42BD_41D7_1E8A64921786",
  "this.veilPopupPanorama",
  "this.zoomImagePopupPanorama",
  "this.closeButtonPopupPanorama"
 ],
 "defaultVRPointer": "laser",
 "scripts": {
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "registerKey": function(key, value){  window[key] = value; },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "existsKey": function(key){  return key in window; },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "unregisterKey": function(key){  delete window[key]; },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "getKey": function(key){  return window[key]; }
 },
 "verticalAlign": "top",
 "paddingBottom": 0,
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": "100%",
 "downloadEnabled": false,
 "shadow": false,
 "gap": 10,
 "class": "Player",
 "paddingRight": 0,
 "minHeight": 20,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "overflow": "visible",
 "definitions": [{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BBA93A6D_B418_A9DA_41DF_BE4E0F1A548B"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 96.69,
   "backwardYaw": 152.79,
   "distance": 1,
   "panorama": "this.panorama_7EA21F0F_7498_5C6A_41D8_19929C3AC58B"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -83.38,
   "backwardYaw": 92.57,
   "distance": 1,
   "panorama": "this.panorama_7EA21DB9_7498_BFB7_41B6_6780B5D32237"
  }
 ],
 "hfov": 360,
 "id": "panorama_BB48943D_B418_B9BB_41DE_BEF438B84FDE",
 "thumbnailUrl": "media/panorama_BB48943D_B418_B9BB_41DE_BEF438B84FDE_t.jpg",
 "label": "To The Second Temple",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB48943D_B418_B9BB_41DE_BEF438B84FDE_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_BB48943D_B418_B9BB_41DE_BEF438B84FDE_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BB48943D_B418_B9BB_41DE_BEF438B84FDE_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BB48943D_B418_B9BB_41DE_BEF438B84FDE_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB48943D_B418_B9BB_41DE_BEF438B84FDE_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_BB48943D_B418_B9BB_41DE_BEF438B84FDE_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BB48943D_B418_B9BB_41DE_BEF438B84FDE_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BB48943D_B418_B9BB_41DE_BEF438B84FDE_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB48943D_B418_B9BB_41DE_BEF438B84FDE_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_BB48943D_B418_B9BB_41DE_BEF438B84FDE_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BB48943D_B418_B9BB_41DE_BEF438B84FDE_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BB48943D_B418_B9BB_41DE_BEF438B84FDE_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB48943D_B418_B9BB_41DE_BEF438B84FDE_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_BB48943D_B418_B9BB_41DE_BEF438B84FDE_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BB48943D_B418_B9BB_41DE_BEF438B84FDE_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BB48943D_B418_B9BB_41DE_BEF438B84FDE_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB48943D_B418_B9BB_41DE_BEF438B84FDE_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_BB48943D_B418_B9BB_41DE_BEF438B84FDE_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BB48943D_B418_B9BB_41DE_BEF438B84FDE_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BB48943D_B418_B9BB_41DE_BEF438B84FDE_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB48943D_B418_B9BB_41DE_BEF438B84FDE_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_BB48943D_B418_B9BB_41DE_BEF438B84FDE_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BB48943D_B418_B9BB_41DE_BEF438B84FDE_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BB48943D_B418_B9BB_41DE_BEF438B84FDE_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BB48943D_B418_B9BB_41DE_BEF438B84FDE_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_A5D631FB_B46B_DABF_41D3_C376D47D1546",
  "this.overlay_A58D7B87_B469_EF57_41DC_05F2598DD14D",
  "this.overlay_A626CCAD_B468_695A_41DD_3E5EB8C408F5"
 ]
},
{
 "hfovMax": 130,
 "class": "Panorama",
 "partial": false,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_95CD3E53_B439_A9C9_41BB_810EAA1DFE58_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_95CD3E53_B439_A9C9_41BB_810EAA1DFE58_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_95CD3E53_B439_A9C9_41BB_810EAA1DFE58_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_95CD3E53_B439_A9C9_41BB_810EAA1DFE58_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_95CD3E53_B439_A9C9_41BB_810EAA1DFE58_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_95CD3E53_B439_A9C9_41BB_810EAA1DFE58_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_95CD3E53_B439_A9C9_41BB_810EAA1DFE58_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_95CD3E53_B439_A9C9_41BB_810EAA1DFE58_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_95CD3E53_B439_A9C9_41BB_810EAA1DFE58_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_95CD3E53_B439_A9C9_41BB_810EAA1DFE58_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_95CD3E53_B439_A9C9_41BB_810EAA1DFE58_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_95CD3E53_B439_A9C9_41BB_810EAA1DFE58_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_95CD3E53_B439_A9C9_41BB_810EAA1DFE58_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_95CD3E53_B439_A9C9_41BB_810EAA1DFE58_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_95CD3E53_B439_A9C9_41BB_810EAA1DFE58_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_95CD3E53_B439_A9C9_41BB_810EAA1DFE58_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_95CD3E53_B439_A9C9_41BB_810EAA1DFE58_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_95CD3E53_B439_A9C9_41BB_810EAA1DFE58_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_95CD3E53_B439_A9C9_41BB_810EAA1DFE58_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_95CD3E53_B439_A9C9_41BB_810EAA1DFE58_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_95CD3E53_B439_A9C9_41BB_810EAA1DFE58_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_95CD3E53_B439_A9C9_41BB_810EAA1DFE58_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_95CD3E53_B439_A9C9_41BB_810EAA1DFE58_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_95CD3E53_B439_A9C9_41BB_810EAA1DFE58_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_95CD3E53_B439_A9C9_41BB_810EAA1DFE58_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "Wide Area Drone 1",
 "id": "panorama_95CD3E53_B439_A9C9_41BB_810EAA1DFE58",
 "thumbnailUrl": "media/panorama_95CD3E53_B439_A9C9_41BB_810EAA1DFE58_t.jpg",
 "hfovMin": "120%",
 "pitch": 0
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_BBB08BDF_B418_EEF6_41B4_912FC2FCEF8E_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -17.13,
   "backwardYaw": 166.83,
   "distance": 1,
   "panorama": "this.panorama_A78285F6_B43F_DAC9_41D5_DC8F7DA52DC0"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 136.91,
   "backwardYaw": -37.44,
   "distance": 1,
   "panorama": "this.panorama_A7808C0B_B43F_A958_41AE_36DF5B301090"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 93.73,
   "backwardYaw": -133.03,
   "distance": 1,
   "panorama": "this.panorama_A7B90CA2_B438_6949_41D9_FECD4F9980FC"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 172.18,
   "backwardYaw": -43.92,
   "distance": 1,
   "panorama": "this.panorama_A0366EF2_B43F_E6C9_41D0_B451038B8996"
  }
 ],
 "hfov": 360,
 "id": "panorama_A7BEAAF4_B43F_EEC9_41D7_7EF99E7900B7",
 "thumbnailUrl": "media/panorama_A7BEAAF4_B43F_EEC9_41D7_7EF99E7900B7_t.jpg",
 "label": "Camping Area 2",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7BEAAF4_B43F_EEC9_41D7_7EF99E7900B7_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A7BEAAF4_B43F_EEC9_41D7_7EF99E7900B7_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A7BEAAF4_B43F_EEC9_41D7_7EF99E7900B7_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A7BEAAF4_B43F_EEC9_41D7_7EF99E7900B7_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7BEAAF4_B43F_EEC9_41D7_7EF99E7900B7_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A7BEAAF4_B43F_EEC9_41D7_7EF99E7900B7_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A7BEAAF4_B43F_EEC9_41D7_7EF99E7900B7_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A7BEAAF4_B43F_EEC9_41D7_7EF99E7900B7_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7BEAAF4_B43F_EEC9_41D7_7EF99E7900B7_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A7BEAAF4_B43F_EEC9_41D7_7EF99E7900B7_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A7BEAAF4_B43F_EEC9_41D7_7EF99E7900B7_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A7BEAAF4_B43F_EEC9_41D7_7EF99E7900B7_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7BEAAF4_B43F_EEC9_41D7_7EF99E7900B7_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A7BEAAF4_B43F_EEC9_41D7_7EF99E7900B7_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A7BEAAF4_B43F_EEC9_41D7_7EF99E7900B7_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A7BEAAF4_B43F_EEC9_41D7_7EF99E7900B7_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7BEAAF4_B43F_EEC9_41D7_7EF99E7900B7_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A7BEAAF4_B43F_EEC9_41D7_7EF99E7900B7_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A7BEAAF4_B43F_EEC9_41D7_7EF99E7900B7_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A7BEAAF4_B43F_EEC9_41D7_7EF99E7900B7_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7BEAAF4_B43F_EEC9_41D7_7EF99E7900B7_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A7BEAAF4_B43F_EEC9_41D7_7EF99E7900B7_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A7BEAAF4_B43F_EEC9_41D7_7EF99E7900B7_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A7BEAAF4_B43F_EEC9_41D7_7EF99E7900B7_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A7BEAAF4_B43F_EEC9_41D7_7EF99E7900B7_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_AA84D436_B428_B948_41A8_897870323BD5",
  "this.overlay_AA9BD86D_B417_E9D9_41E2_6A2104DF75BB",
  "this.overlay_9563AFEF_B418_66DA_41DF_9EE2A981D3BA",
  "this.overlay_7FB6D8E5_6996_C389_41CF_A7A851E60D1E",
  "this.popup_7C8727FE_6996_4D7A_41D9_7D0E3E50B5AB",
  "this.overlay_74CD6038_69B6_42FB_41D7_B31330932CE2"
 ]
},
{
 "partial": false,
 "id": "panorama_95C99373_B439_DFC9_41CF_DBA77EFE762A",
 "thumbnailUrl": "media/panorama_95C99373_B439_DFC9_41CF_DBA77EFE762A_t.jpg",
 "hfov": 360,
 "label": "Low View Temple Drone",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_95C99373_B439_DFC9_41CF_DBA77EFE762A_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_95C99373_B439_DFC9_41CF_DBA77EFE762A_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_95C99373_B439_DFC9_41CF_DBA77EFE762A_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_95C99373_B439_DFC9_41CF_DBA77EFE762A_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_95C99373_B439_DFC9_41CF_DBA77EFE762A_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_95C99373_B439_DFC9_41CF_DBA77EFE762A_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_95C99373_B439_DFC9_41CF_DBA77EFE762A_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_95C99373_B439_DFC9_41CF_DBA77EFE762A_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_95C99373_B439_DFC9_41CF_DBA77EFE762A_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_95C99373_B439_DFC9_41CF_DBA77EFE762A_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_95C99373_B439_DFC9_41CF_DBA77EFE762A_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_95C99373_B439_DFC9_41CF_DBA77EFE762A_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_95C99373_B439_DFC9_41CF_DBA77EFE762A_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_95C99373_B439_DFC9_41CF_DBA77EFE762A_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_95C99373_B439_DFC9_41CF_DBA77EFE762A_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_95C99373_B439_DFC9_41CF_DBA77EFE762A_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_95C99373_B439_DFC9_41CF_DBA77EFE762A_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_95C99373_B439_DFC9_41CF_DBA77EFE762A_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_95C99373_B439_DFC9_41CF_DBA77EFE762A_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_95C99373_B439_DFC9_41CF_DBA77EFE762A_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_95C99373_B439_DFC9_41CF_DBA77EFE762A_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_95C99373_B439_DFC9_41CF_DBA77EFE762A_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_95C99373_B439_DFC9_41CF_DBA77EFE762A_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_95C99373_B439_DFC9_41CF_DBA77EFE762A_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_95C99373_B439_DFC9_41CF_DBA77EFE762A_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "120%",
 "overlays": [
  "this.overlay_7DE79FC7_6993_DD8B_41D5_706A8AEF9714",
  "this.popup_7CF23DAF_6992_5D9C_41CC_1C47C22202CD",
  "this.overlay_7D03690B_6992_C284_41D0_5788B6CF4BD3",
  "this.popup_7CE8CBE5_6992_C58F_41CF_69F433BB960C",
  "this.overlay_7C6749C0_6995_C586_41C3_FDBE763A1727",
  "this.popup_7F1D2678_6996_4E86_41D4_B394CB6B5C99"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -139.08,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_B56238DB_BB3F_66E4_41E3_D8B06177AA75"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_BB48DE80_B418_E949_41D5_AC51A1BC4CDE_camera"
},
{
 "class": "PlayList",
 "items": [
  {
   "class": "PanoramaPlayListItem",
   "end": "this.setComponentVisibility(this.Image_7AC4751F_69BE_42BD_41D7_1E8A64921786, false, -1, this.effect_7C16D668_69B2_CE83_41B8_40EC1A4EDC42, 'hideEffect', false)",
   "camera": "this.panorama_7FD5281A_7498_4475_41D5_125CE4CC7753_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_76BC1297_6992_47B3_41D5_DBE480A6EDAD_playlist, 0, 1); this.keepComponentVisibility(this.Image_7AC4751F_69BE_42BD_41D7_1E8A64921786, false); this.setComponentVisibility(this.Image_7AC4751F_69BE_42BD_41D7_1E8A64921786, true, -1, this.effect_7C16F668_69B2_CE83_41D6_58CA337093FE, 'showEffect', false)",
   "media": "this.panorama_7FD5281A_7498_4475_41D5_125CE4CC7753",
   "player": "this.MainViewerPanoramaPlayer",
   "start": "this.keepComponentVisibility(this.Image_7AC4751F_69BE_42BD_41D7_1E8A64921786, true)"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A7B96437_B438_B9B7_41D3_8359BF07DA8B_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_76BC1297_6992_47B3_41D5_DBE480A6EDAD_playlist, 1, 2)",
   "media": "this.panorama_A7B96437_B438_B9B7_41D3_8359BF07DA8B",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "end": "this.setComponentVisibility(this.Image_7AC4751F_69BE_42BD_41D7_1E8A64921786, false, -1, this.effect_7C167668_69B2_CE83_41CE_5D98DDCE0010, 'hideEffect', false)",
   "camera": "this.panorama_7EA62FDF_7498_7BEB_41B0_E9C030E0910C_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_76BC1297_6992_47B3_41D5_DBE480A6EDAD_playlist, 2, 3); this.keepComponentVisibility(this.Image_7AC4751F_69BE_42BD_41D7_1E8A64921786, false); this.setComponentVisibility(this.Image_7AC4751F_69BE_42BD_41D7_1E8A64921786, true, -1, this.effect_7C166668_69B2_CE83_41C0_E996540EE3C0, 'showEffect', false)",
   "media": "this.panorama_7EA62FDF_7498_7BEB_41B0_E9C030E0910C",
   "player": "this.MainViewerPanoramaPlayer",
   "start": "this.keepComponentVisibility(this.Image_7AC4751F_69BE_42BD_41D7_1E8A64921786, true)"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_7EC7D790_7498_4C75_41CB_BD28A22679B2_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_76BC1297_6992_47B3_41D5_DBE480A6EDAD_playlist, 3, 4)",
   "media": "this.panorama_7EC7D790_7498_4C75_41CB_BD28A22679B2",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_7EA21F0F_7498_5C6A_41D8_19929C3AC58B_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_76BC1297_6992_47B3_41D5_DBE480A6EDAD_playlist, 4, 5)",
   "media": "this.panorama_7EA21F0F_7498_5C6A_41D8_19929C3AC58B",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_7ECAB660_7498_4CD6_41D4_1A5A06463D23_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_76BC1297_6992_47B3_41D5_DBE480A6EDAD_playlist, 5, 6)",
   "media": "this.panorama_7ECAB660_7498_4CD6_41D4_1A5A06463D23",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A7B936D4_B438_66C8_41D7_BBFCC5890205_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_76BC1297_6992_47B3_41D5_DBE480A6EDAD_playlist, 6, 7)",
   "media": "this.panorama_A7B936D4_B438_66C8_41D7_BBFCC5890205",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BBB08BDF_B418_EEF6_41B4_912FC2FCEF8E_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_76BC1297_6992_47B3_41D5_DBE480A6EDAD_playlist, 7, 8)",
   "media": "this.panorama_BBB08BDF_B418_EEF6_41B4_912FC2FCEF8E",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BB4975DB_B418_FAFF_41E0_72C5A527492C_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_76BC1297_6992_47B3_41D5_DBE480A6EDAD_playlist, 8, 9)",
   "media": "this.panorama_BB4975DB_B418_FAFF_41E0_72C5A527492C",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BBA93A6D_B418_A9DA_41DF_BE4E0F1A548B_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_76BC1297_6992_47B3_41D5_DBE480A6EDAD_playlist, 9, 10)",
   "media": "this.panorama_BBA93A6D_B418_A9DA_41DF_BE4E0F1A548B",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BBB1C0DB_B418_7AFE_41E5_7573BE28445D_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_76BC1297_6992_47B3_41D5_DBE480A6EDAD_playlist, 10, 11)",
   "media": "this.panorama_BBB1C0DB_B418_7AFE_41E5_7573BE28445D",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BB48943D_B418_B9BB_41DE_BEF438B84FDE_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_76BC1297_6992_47B3_41D5_DBE480A6EDAD_playlist, 11, 12)",
   "media": "this.panorama_BB48943D_B418_B9BB_41DE_BEF438B84FDE",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_7EA21DB9_7498_BFB7_41B6_6780B5D32237_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_76BC1297_6992_47B3_41D5_DBE480A6EDAD_playlist, 12, 13)",
   "media": "this.panorama_7EA21DB9_7498_BFB7_41B6_6780B5D32237",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BB48DE80_B418_E949_41D5_AC51A1BC4CDE_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_76BC1297_6992_47B3_41D5_DBE480A6EDAD_playlist, 13, 14)",
   "media": "this.panorama_BB48DE80_B418_E949_41D5_AC51A1BC4CDE",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A786980F_B438_A958_41CC_E1CD8D96840B_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_76BC1297_6992_47B3_41D5_DBE480A6EDAD_playlist, 14, 15)",
   "media": "this.panorama_A786980F_B438_A958_41CC_E1CD8D96840B",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A7808C0B_B43F_A958_41AE_36DF5B301090_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_76BC1297_6992_47B3_41D5_DBE480A6EDAD_playlist, 15, 16)",
   "media": "this.panorama_A7808C0B_B43F_A958_41AE_36DF5B301090",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A7B90CA2_B438_6949_41D9_FECD4F9980FC_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_76BC1297_6992_47B3_41D5_DBE480A6EDAD_playlist, 16, 17)",
   "media": "this.panorama_A7B90CA2_B438_6949_41D9_FECD4F9980FC",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A0366EF2_B43F_E6C9_41D0_B451038B8996_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_76BC1297_6992_47B3_41D5_DBE480A6EDAD_playlist, 17, 18)",
   "media": "this.panorama_A0366EF2_B43F_E6C9_41D0_B451038B8996",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A7BEAAF4_B43F_EEC9_41D7_7EF99E7900B7_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_76BC1297_6992_47B3_41D5_DBE480A6EDAD_playlist, 18, 19)",
   "media": "this.panorama_A7BEAAF4_B43F_EEC9_41D7_7EF99E7900B7",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A78285F6_B43F_DAC9_41D5_DC8F7DA52DC0_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_76BC1297_6992_47B3_41D5_DBE480A6EDAD_playlist, 19, 20)",
   "media": "this.panorama_A78285F6_B43F_DAC9_41D5_DC8F7DA52DC0",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A7BEF0A3_B43F_B94F_41B9_9975BB394A37_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_76BC1297_6992_47B3_41D5_DBE480A6EDAD_playlist, 20, 21)",
   "media": "this.panorama_A7BEF0A3_B43F_B94F_41B9_9975BB394A37",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A78661E2_B438_7AC9_41D6_BADE776856B8_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_76BC1297_6992_47B3_41D5_DBE480A6EDAD_playlist, 21, 22)",
   "media": "this.panorama_A78661E2_B438_7AC9_41D6_BADE776856B8",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A7924FCC_B438_A6D8_41E4_F69093B7B763_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_76BC1297_6992_47B3_41D5_DBE480A6EDAD_playlist, 22, 23)",
   "media": "this.panorama_A7924FCC_B438_A6D8_41E4_F69093B7B763",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A7B91B96_B438_EF49_41D0_EA4C08E176A7_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_76BC1297_6992_47B3_41D5_DBE480A6EDAD_playlist, 23, 24)",
   "media": "this.panorama_A7B91B96_B438_EF49_41D0_EA4C08E176A7",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_97C448F2_B438_6ACB_41C4_33E793A0EAB5_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_76BC1297_6992_47B3_41D5_DBE480A6EDAD_playlist, 24, 25)",
   "media": "this.panorama_97C448F2_B438_6ACB_41C4_33E793A0EAB5",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_95CD3E53_B439_A9C9_41BB_810EAA1DFE58_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_76BC1297_6992_47B3_41D5_DBE480A6EDAD_playlist, 25, 26)",
   "media": "this.panorama_95CD3E53_B439_A9C9_41BB_810EAA1DFE58",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_95EBABAF_B439_AF59_41E0_DD8AB662F458_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_76BC1297_6992_47B3_41D5_DBE480A6EDAD_playlist, 26, 27)",
   "media": "this.panorama_95EBABAF_B439_AF59_41E0_DD8AB662F458",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_95C2995D_B439_EBFE_41E4_BB7C848E21F6_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_76BC1297_6992_47B3_41D5_DBE480A6EDAD_playlist, 27, 28)",
   "media": "this.panorama_95C2995D_B439_EBFE_41E4_BB7C848E21F6",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_95EBD687_B439_F94A_41D8_B3A956CC1C1A_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_76BC1297_6992_47B3_41D5_DBE480A6EDAD_playlist, 28, 29)",
   "media": "this.panorama_95EBD687_B439_F94A_41D8_B3A956CC1C1A",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_95C99373_B439_DFC9_41CF_DBA77EFE762A_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_76BC1297_6992_47B3_41D5_DBE480A6EDAD_playlist, 29, 0)",
   "media": "this.panorama_95C99373_B439_DFC9_41CF_DBA77EFE762A",
   "player": "this.MainViewerPanoramaPlayer"
  }
 ],
 "id": "DropDown_76BC1297_6992_47B3_41D5_DBE480A6EDAD_playlist"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 170.65,
   "backwardYaw": 173.03,
   "distance": 1,
   "panorama": "this.panorama_BBA93A6D_B418_A9DA_41DF_BE4E0F1A548B"
  }
 ],
 "hfov": 360,
 "id": "panorama_BBB08BDF_B418_EEF6_41B4_912FC2FCEF8E",
 "thumbnailUrl": "media/panorama_BBB08BDF_B418_EEF6_41B4_912FC2FCEF8E_t.jpg",
 "label": "Bungallow 1",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BBB08BDF_B418_EEF6_41B4_912FC2FCEF8E_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_BBB08BDF_B418_EEF6_41B4_912FC2FCEF8E_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BBB08BDF_B418_EEF6_41B4_912FC2FCEF8E_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BBB08BDF_B418_EEF6_41B4_912FC2FCEF8E_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BBB08BDF_B418_EEF6_41B4_912FC2FCEF8E_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_BBB08BDF_B418_EEF6_41B4_912FC2FCEF8E_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BBB08BDF_B418_EEF6_41B4_912FC2FCEF8E_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BBB08BDF_B418_EEF6_41B4_912FC2FCEF8E_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BBB08BDF_B418_EEF6_41B4_912FC2FCEF8E_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_BBB08BDF_B418_EEF6_41B4_912FC2FCEF8E_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BBB08BDF_B418_EEF6_41B4_912FC2FCEF8E_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BBB08BDF_B418_EEF6_41B4_912FC2FCEF8E_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BBB08BDF_B418_EEF6_41B4_912FC2FCEF8E_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_BBB08BDF_B418_EEF6_41B4_912FC2FCEF8E_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BBB08BDF_B418_EEF6_41B4_912FC2FCEF8E_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BBB08BDF_B418_EEF6_41B4_912FC2FCEF8E_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BBB08BDF_B418_EEF6_41B4_912FC2FCEF8E_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_BBB08BDF_B418_EEF6_41B4_912FC2FCEF8E_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BBB08BDF_B418_EEF6_41B4_912FC2FCEF8E_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BBB08BDF_B418_EEF6_41B4_912FC2FCEF8E_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BBB08BDF_B418_EEF6_41B4_912FC2FCEF8E_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_BBB08BDF_B418_EEF6_41B4_912FC2FCEF8E_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BBB08BDF_B418_EEF6_41B4_912FC2FCEF8E_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BBB08BDF_B418_EEF6_41B4_912FC2FCEF8E_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BBB08BDF_B418_EEF6_41B4_912FC2FCEF8E_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_A0A91044_B429_F9C9_41BC_7E7928669554"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -98.55,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_B5B94926_BB3F_67AC_41DB_091BF9790A1D"
},
{
 "class": "PlayList",
 "items": [
  {
   "class": "PanoramaPlayListItem",
   "end": "this.setComponentVisibility(this.Image_7AC4751F_69BE_42BD_41D7_1E8A64921786, false, -1, this.effect_7C16D668_69B2_CE83_41B8_40EC1A4EDC42, 'hideEffect', false)",
   "camera": "this.panorama_7FD5281A_7498_4475_41D5_125CE4CC7753_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1); this.keepComponentVisibility(this.Image_7AC4751F_69BE_42BD_41D7_1E8A64921786, false); this.setComponentVisibility(this.Image_7AC4751F_69BE_42BD_41D7_1E8A64921786, true, -1, this.effect_7C16F668_69B2_CE83_41D6_58CA337093FE, 'showEffect', false)",
   "media": "this.panorama_7FD5281A_7498_4475_41D5_125CE4CC7753",
   "player": "this.MainViewerPanoramaPlayer",
   "start": "this.keepComponentVisibility(this.Image_7AC4751F_69BE_42BD_41D7_1E8A64921786, true)"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A7B96437_B438_B9B7_41D3_8359BF07DA8B_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "media": "this.panorama_A7B96437_B438_B9B7_41D3_8359BF07DA8B",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "end": "this.setComponentVisibility(this.Image_7AC4751F_69BE_42BD_41D7_1E8A64921786, false, -1, this.effect_7C167668_69B2_CE83_41CE_5D98DDCE0010, 'hideEffect', false)",
   "camera": "this.panorama_7EA62FDF_7498_7BEB_41B0_E9C030E0910C_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3); this.keepComponentVisibility(this.Image_7AC4751F_69BE_42BD_41D7_1E8A64921786, false); this.setComponentVisibility(this.Image_7AC4751F_69BE_42BD_41D7_1E8A64921786, true, -1, this.effect_7C166668_69B2_CE83_41C0_E996540EE3C0, 'showEffect', false)",
   "media": "this.panorama_7EA62FDF_7498_7BEB_41B0_E9C030E0910C",
   "player": "this.MainViewerPanoramaPlayer",
   "start": "this.keepComponentVisibility(this.Image_7AC4751F_69BE_42BD_41D7_1E8A64921786, true)"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_7EC7D790_7498_4C75_41CB_BD28A22679B2_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "media": "this.panorama_7EC7D790_7498_4C75_41CB_BD28A22679B2",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_7EA21F0F_7498_5C6A_41D8_19929C3AC58B_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "media": "this.panorama_7EA21F0F_7498_5C6A_41D8_19929C3AC58B",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_7ECAB660_7498_4CD6_41D4_1A5A06463D23_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "media": "this.panorama_7ECAB660_7498_4CD6_41D4_1A5A06463D23",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A7B936D4_B438_66C8_41D7_BBFCC5890205_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "media": "this.panorama_A7B936D4_B438_66C8_41D7_BBFCC5890205",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BBB08BDF_B418_EEF6_41B4_912FC2FCEF8E_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "media": "this.panorama_BBB08BDF_B418_EEF6_41B4_912FC2FCEF8E",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BB4975DB_B418_FAFF_41E0_72C5A527492C_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "media": "this.panorama_BB4975DB_B418_FAFF_41E0_72C5A527492C",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BBA93A6D_B418_A9DA_41DF_BE4E0F1A548B_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "media": "this.panorama_BBA93A6D_B418_A9DA_41DF_BE4E0F1A548B",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BBB1C0DB_B418_7AFE_41E5_7573BE28445D_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "media": "this.panorama_BBB1C0DB_B418_7AFE_41E5_7573BE28445D",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BB48943D_B418_B9BB_41DE_BEF438B84FDE_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "media": "this.panorama_BB48943D_B418_B9BB_41DE_BEF438B84FDE",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_7EA21DB9_7498_BFB7_41B6_6780B5D32237_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "media": "this.panorama_7EA21DB9_7498_BFB7_41B6_6780B5D32237",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BB48DE80_B418_E949_41D5_AC51A1BC4CDE_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 14)",
   "media": "this.panorama_BB48DE80_B418_E949_41D5_AC51A1BC4CDE",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A786980F_B438_A958_41CC_E1CD8D96840B_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 14, 15)",
   "media": "this.panorama_A786980F_B438_A958_41CC_E1CD8D96840B",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A7808C0B_B43F_A958_41AE_36DF5B301090_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 16)",
   "media": "this.panorama_A7808C0B_B43F_A958_41AE_36DF5B301090",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A7B90CA2_B438_6949_41D9_FECD4F9980FC_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 16, 17)",
   "media": "this.panorama_A7B90CA2_B438_6949_41D9_FECD4F9980FC",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A0366EF2_B43F_E6C9_41D0_B451038B8996_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 17, 18)",
   "media": "this.panorama_A0366EF2_B43F_E6C9_41D0_B451038B8996",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A7BEAAF4_B43F_EEC9_41D7_7EF99E7900B7_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 18, 19)",
   "media": "this.panorama_A7BEAAF4_B43F_EEC9_41D7_7EF99E7900B7",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A78285F6_B43F_DAC9_41D5_DC8F7DA52DC0_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 19, 20)",
   "media": "this.panorama_A78285F6_B43F_DAC9_41D5_DC8F7DA52DC0",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A7BEF0A3_B43F_B94F_41B9_9975BB394A37_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 20, 21)",
   "media": "this.panorama_A7BEF0A3_B43F_B94F_41B9_9975BB394A37",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A78661E2_B438_7AC9_41D6_BADE776856B8_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 21, 22)",
   "media": "this.panorama_A78661E2_B438_7AC9_41D6_BADE776856B8",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A7924FCC_B438_A6D8_41E4_F69093B7B763_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 22, 23)",
   "media": "this.panorama_A7924FCC_B438_A6D8_41E4_F69093B7B763",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A7B91B96_B438_EF49_41D0_EA4C08E176A7_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 23, 24)",
   "media": "this.panorama_A7B91B96_B438_EF49_41D0_EA4C08E176A7",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_97C448F2_B438_6ACB_41C4_33E793A0EAB5_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 24, 25)",
   "media": "this.panorama_97C448F2_B438_6ACB_41C4_33E793A0EAB5",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_95CD3E53_B439_A9C9_41BB_810EAA1DFE58_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 25, 26)",
   "media": "this.panorama_95CD3E53_B439_A9C9_41BB_810EAA1DFE58",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_95EBABAF_B439_AF59_41E0_DD8AB662F458_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 26, 27)",
   "media": "this.panorama_95EBABAF_B439_AF59_41E0_DD8AB662F458",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_95C2995D_B439_EBFE_41E4_BB7C848E21F6_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 27, 28)",
   "media": "this.panorama_95C2995D_B439_EBFE_41E4_BB7C848E21F6",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_95EBD687_B439_F94A_41D8_B3A956CC1C1A_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 28, 29)",
   "media": "this.panorama_95EBD687_B439_F94A_41D8_B3A956CC1C1A",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "end": "this.trigger('tourEnded')",
   "camera": "this.panorama_95C99373_B439_DFC9_41CF_DBA77EFE762A_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 29, 0)",
   "media": "this.panorama_95C99373_B439_DFC9_41CF_DBA77EFE762A",
   "player": "this.MainViewerPanoramaPlayer"
  }
 ],
 "id": "mainPlayList"
},
{
 "class": "ImageResource",
 "id": "ImageResource_70A51095_69F2_4389_41CF_C8E9C7CA50E1",
 "levels": [
  {
   "url": "media/popup_7C97490D_698E_4299_41D9_6E94BBE9B2BB_0_0.jpg",
   "class": "ImageResourceLevel",
   "width": 1600,
   "height": 1131
  },
  {
   "url": "media/popup_7C97490D_698E_4299_41D9_6E94BBE9B2BB_0_1.jpg",
   "class": "ImageResourceLevel",
   "width": 1024,
   "height": 723
  },
  {
   "url": "media/popup_7C97490D_698E_4299_41D9_6E94BBE9B2BB_0_2.jpg",
   "class": "ImageResourceLevel",
   "width": 512,
   "height": 361
  }
 ]
},
{
 "rotationY": 0,
 "class": "PopupPanoramaOverlay",
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 5.32,
 "id": "popup_7C8727FE_6996_4D7A_41D9_7D0E3E50B5AB",
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_7C8727FE_6996_4D7A_41D9_7D0E3E50B5AB_0_1.jpg",
    "class": "ImageResourceLevel",
    "width": 1024,
    "height": 723
   }
  ]
 },
 "pitch": 2.13,
 "yaw": -78.47,
 "hideDuration": 500,
 "popupDistance": 100
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 142.56,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_AA99C7E1_BB3F_6AA4_41E3_3CC08C24D617"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -90.59,
   "backwardYaw": 11.59,
   "distance": 1,
   "panorama": "this.panorama_BBA93A6D_B418_A9DA_41DF_BE4E0F1A548B"
  }
 ],
 "hfov": 360,
 "id": "panorama_BB4975DB_B418_FAFF_41E0_72C5A527492C",
 "thumbnailUrl": "media/panorama_BB4975DB_B418_FAFF_41E0_72C5A527492C_t.jpg",
 "label": "Bungallow 2",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB4975DB_B418_FAFF_41E0_72C5A527492C_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_BB4975DB_B418_FAFF_41E0_72C5A527492C_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BB4975DB_B418_FAFF_41E0_72C5A527492C_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BB4975DB_B418_FAFF_41E0_72C5A527492C_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB4975DB_B418_FAFF_41E0_72C5A527492C_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_BB4975DB_B418_FAFF_41E0_72C5A527492C_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BB4975DB_B418_FAFF_41E0_72C5A527492C_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BB4975DB_B418_FAFF_41E0_72C5A527492C_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB4975DB_B418_FAFF_41E0_72C5A527492C_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_BB4975DB_B418_FAFF_41E0_72C5A527492C_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BB4975DB_B418_FAFF_41E0_72C5A527492C_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BB4975DB_B418_FAFF_41E0_72C5A527492C_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB4975DB_B418_FAFF_41E0_72C5A527492C_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_BB4975DB_B418_FAFF_41E0_72C5A527492C_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BB4975DB_B418_FAFF_41E0_72C5A527492C_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BB4975DB_B418_FAFF_41E0_72C5A527492C_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB4975DB_B418_FAFF_41E0_72C5A527492C_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_BB4975DB_B418_FAFF_41E0_72C5A527492C_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BB4975DB_B418_FAFF_41E0_72C5A527492C_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BB4975DB_B418_FAFF_41E0_72C5A527492C_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB4975DB_B418_FAFF_41E0_72C5A527492C_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_BB4975DB_B418_FAFF_41E0_72C5A527492C_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BB4975DB_B418_FAFF_41E0_72C5A527492C_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BB4975DB_B418_FAFF_41E0_72C5A527492C_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BB4975DB_B418_FAFF_41E0_72C5A527492C_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_A7588CB2_B478_A949_41E1_BA0E2F7A3C1E"
 ]
},
{
 "rotationY": 0,
 "class": "PopupPanoramaOverlay",
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 3.94,
 "id": "popup_7C97490D_698E_4299_41D9_6E94BBE9B2BB",
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_7C97490D_698E_4299_41D9_6E94BBE9B2BB_0_1.jpg",
    "class": "ImageResourceLevel",
    "width": 1024,
    "height": 723
   }
  ]
 },
 "pitch": -1.2,
 "yaw": -6.47,
 "hideDuration": 500,
 "popupDistance": 100
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 86.09,
   "backwardYaw": -85.91,
   "distance": 1,
   "panorama": "this.panorama_7FD5281A_7498_4475_41D5_125CE4CC7753"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -91.96,
   "backwardYaw": 64.38,
   "distance": 1,
   "panorama": "this.panorama_7EA62FDF_7498_7BEB_41B0_E9C030E0910C"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -20.14,
   "backwardYaw": 143.83,
   "distance": 1,
   "panorama": "this.panorama_A7B936D4_B438_66C8_41D7_BBFCC5890205"
  }
 ],
 "hfov": 360,
 "id": "panorama_A7B96437_B438_B9B7_41D3_8359BF07DA8B",
 "thumbnailUrl": "media/panorama_A7B96437_B438_B9B7_41D3_8359BF07DA8B_t.jpg",
 "label": "Road To The Lake 2",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7B96437_B438_B9B7_41D3_8359BF07DA8B_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A7B96437_B438_B9B7_41D3_8359BF07DA8B_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A7B96437_B438_B9B7_41D3_8359BF07DA8B_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A7B96437_B438_B9B7_41D3_8359BF07DA8B_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7B96437_B438_B9B7_41D3_8359BF07DA8B_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A7B96437_B438_B9B7_41D3_8359BF07DA8B_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A7B96437_B438_B9B7_41D3_8359BF07DA8B_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A7B96437_B438_B9B7_41D3_8359BF07DA8B_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7B96437_B438_B9B7_41D3_8359BF07DA8B_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A7B96437_B438_B9B7_41D3_8359BF07DA8B_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A7B96437_B438_B9B7_41D3_8359BF07DA8B_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A7B96437_B438_B9B7_41D3_8359BF07DA8B_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7B96437_B438_B9B7_41D3_8359BF07DA8B_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A7B96437_B438_B9B7_41D3_8359BF07DA8B_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A7B96437_B438_B9B7_41D3_8359BF07DA8B_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A7B96437_B438_B9B7_41D3_8359BF07DA8B_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7B96437_B438_B9B7_41D3_8359BF07DA8B_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A7B96437_B438_B9B7_41D3_8359BF07DA8B_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A7B96437_B438_B9B7_41D3_8359BF07DA8B_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A7B96437_B438_B9B7_41D3_8359BF07DA8B_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7B96437_B438_B9B7_41D3_8359BF07DA8B_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A7B96437_B438_B9B7_41D3_8359BF07DA8B_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A7B96437_B438_B9B7_41D3_8359BF07DA8B_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A7B96437_B438_B9B7_41D3_8359BF07DA8B_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A7B96437_B438_B9B7_41D3_8359BF07DA8B_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_A1193899_B439_A97B_41B6_698BBDA5941E",
  "this.overlay_A11CC5FE_B438_5AB9_41DC_2DB08F3447F9",
  "this.overlay_A210D007_B429_D957_41DA_2C9E2040E52A"
 ]
},
{
 "class": "ImageResource",
 "id": "ImageResource_7375EF89_698E_5D9B_41C8_19FDD3D997DD",
 "levels": [
  {
   "url": "media/popup_7E2894E8_69F6_4387_41D1_B8D6C9AF71B4_0_0.jpg",
   "class": "ImageResourceLevel",
   "width": 1600,
   "height": 1131
  },
  {
   "url": "media/popup_7E2894E8_69F6_4387_41D1_B8D6C9AF71B4_0_1.jpg",
   "class": "ImageResourceLevel",
   "width": 1024,
   "height": 723
  },
  {
   "url": "media/popup_7E2894E8_69F6_4387_41D1_B8D6C9AF71B4_0_2.jpg",
   "class": "ImageResourceLevel",
   "width": 512,
   "height": 361
  }
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -87.43,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_AB41EB1B_BB3F_7B64_41D2_A936CB66AB0F"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 81.45,
   "backwardYaw": -108.97,
   "distance": 1,
   "panorama": "this.panorama_7EA62FDF_7498_7BEB_41B0_E9C030E0910C"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -98.46,
   "backwardYaw": 74.95,
   "distance": 1,
   "panorama": "this.panorama_7EA21F0F_7498_5C6A_41D8_19929C3AC58B"
  }
 ],
 "hfov": 360,
 "id": "panorama_7EC7D790_7498_4C75_41CB_BD28A22679B2",
 "thumbnailUrl": "media/panorama_7EC7D790_7498_4C75_41CB_BD28A22679B2_t.jpg",
 "label": "Road To The Lake 4",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7EC7D790_7498_4C75_41CB_BD28A22679B2_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_7EC7D790_7498_4C75_41CB_BD28A22679B2_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_7EC7D790_7498_4C75_41CB_BD28A22679B2_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7EC7D790_7498_4C75_41CB_BD28A22679B2_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7EC7D790_7498_4C75_41CB_BD28A22679B2_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_7EC7D790_7498_4C75_41CB_BD28A22679B2_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_7EC7D790_7498_4C75_41CB_BD28A22679B2_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7EC7D790_7498_4C75_41CB_BD28A22679B2_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7EC7D790_7498_4C75_41CB_BD28A22679B2_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_7EC7D790_7498_4C75_41CB_BD28A22679B2_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_7EC7D790_7498_4C75_41CB_BD28A22679B2_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7EC7D790_7498_4C75_41CB_BD28A22679B2_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7EC7D790_7498_4C75_41CB_BD28A22679B2_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_7EC7D790_7498_4C75_41CB_BD28A22679B2_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_7EC7D790_7498_4C75_41CB_BD28A22679B2_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7EC7D790_7498_4C75_41CB_BD28A22679B2_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7EC7D790_7498_4C75_41CB_BD28A22679B2_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_7EC7D790_7498_4C75_41CB_BD28A22679B2_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_7EC7D790_7498_4C75_41CB_BD28A22679B2_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7EC7D790_7498_4C75_41CB_BD28A22679B2_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7EC7D790_7498_4C75_41CB_BD28A22679B2_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_7EC7D790_7498_4C75_41CB_BD28A22679B2_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_7EC7D790_7498_4C75_41CB_BD28A22679B2_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7EC7D790_7498_4C75_41CB_BD28A22679B2_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7EC7D790_7498_4C75_41CB_BD28A22679B2_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_7BA1DAD7_7498_45FB_41B8_E95D122063E4",
  "this.overlay_7B077551_7498_CCF7_41D4_A3A1B1705875"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 92.57,
   "backwardYaw": -83.38,
   "distance": 1,
   "panorama": "this.panorama_BB48943D_B418_B9BB_41DE_BEF438B84FDE"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -86.73,
   "backwardYaw": 89.43,
   "distance": 1,
   "panorama": "this.panorama_BB48DE80_B418_E949_41D5_AC51A1BC4CDE"
  }
 ],
 "hfov": 360,
 "id": "panorama_7EA21DB9_7498_BFB7_41B6_6780B5D32237",
 "thumbnailUrl": "media/panorama_7EA21DB9_7498_BFB7_41B6_6780B5D32237_t.jpg",
 "label": "To The Second Temple 2",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7EA21DB9_7498_BFB7_41B6_6780B5D32237_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_7EA21DB9_7498_BFB7_41B6_6780B5D32237_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_7EA21DB9_7498_BFB7_41B6_6780B5D32237_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7EA21DB9_7498_BFB7_41B6_6780B5D32237_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7EA21DB9_7498_BFB7_41B6_6780B5D32237_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_7EA21DB9_7498_BFB7_41B6_6780B5D32237_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_7EA21DB9_7498_BFB7_41B6_6780B5D32237_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7EA21DB9_7498_BFB7_41B6_6780B5D32237_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7EA21DB9_7498_BFB7_41B6_6780B5D32237_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_7EA21DB9_7498_BFB7_41B6_6780B5D32237_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_7EA21DB9_7498_BFB7_41B6_6780B5D32237_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7EA21DB9_7498_BFB7_41B6_6780B5D32237_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7EA21DB9_7498_BFB7_41B6_6780B5D32237_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_7EA21DB9_7498_BFB7_41B6_6780B5D32237_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_7EA21DB9_7498_BFB7_41B6_6780B5D32237_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7EA21DB9_7498_BFB7_41B6_6780B5D32237_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7EA21DB9_7498_BFB7_41B6_6780B5D32237_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_7EA21DB9_7498_BFB7_41B6_6780B5D32237_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_7EA21DB9_7498_BFB7_41B6_6780B5D32237_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7EA21DB9_7498_BFB7_41B6_6780B5D32237_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7EA21DB9_7498_BFB7_41B6_6780B5D32237_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_7EA21DB9_7498_BFB7_41B6_6780B5D32237_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_7EA21DB9_7498_BFB7_41B6_6780B5D32237_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7EA21DB9_7498_BFB7_41B6_6780B5D32237_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7EA21DB9_7498_BFB7_41B6_6780B5D32237_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_A51490AA_B42F_F959_41C2_11EF341710B6",
  "this.overlay_A086F29E_B418_5979_41E1_700C254AEB53"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 94.09,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_B4BBFA34_BB3F_65AC_41E6_E0315EEC61A2"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -8.7,
   "backwardYaw": 0.52,
   "distance": 1,
   "panorama": "this.panorama_A7B91B96_B438_EF49_41D0_EA4C08E176A7"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 96.93,
   "backwardYaw": 41.68,
   "distance": 1,
   "panorama": "this.panorama_7ECAB660_7498_4CD6_41D4_1A5A06463D23"
  }
 ],
 "hfov": 360,
 "id": "panorama_A78661E2_B438_7AC9_41D6_BADE776856B8",
 "thumbnailUrl": "media/panorama_A78661E2_B438_7AC9_41D6_BADE776856B8_t.jpg",
 "label": "Temple 1",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A78661E2_B438_7AC9_41D6_BADE776856B8_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A78661E2_B438_7AC9_41D6_BADE776856B8_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A78661E2_B438_7AC9_41D6_BADE776856B8_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A78661E2_B438_7AC9_41D6_BADE776856B8_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A78661E2_B438_7AC9_41D6_BADE776856B8_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A78661E2_B438_7AC9_41D6_BADE776856B8_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A78661E2_B438_7AC9_41D6_BADE776856B8_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A78661E2_B438_7AC9_41D6_BADE776856B8_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A78661E2_B438_7AC9_41D6_BADE776856B8_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A78661E2_B438_7AC9_41D6_BADE776856B8_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A78661E2_B438_7AC9_41D6_BADE776856B8_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A78661E2_B438_7AC9_41D6_BADE776856B8_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A78661E2_B438_7AC9_41D6_BADE776856B8_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A78661E2_B438_7AC9_41D6_BADE776856B8_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A78661E2_B438_7AC9_41D6_BADE776856B8_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A78661E2_B438_7AC9_41D6_BADE776856B8_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A78661E2_B438_7AC9_41D6_BADE776856B8_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A78661E2_B438_7AC9_41D6_BADE776856B8_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A78661E2_B438_7AC9_41D6_BADE776856B8_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A78661E2_B438_7AC9_41D6_BADE776856B8_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A78661E2_B438_7AC9_41D6_BADE776856B8_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A78661E2_B438_7AC9_41D6_BADE776856B8_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A78661E2_B438_7AC9_41D6_BADE776856B8_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A78661E2_B438_7AC9_41D6_BADE776856B8_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A78661E2_B438_7AC9_41D6_BADE776856B8_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_AE62505F_B418_79F8_41E5_837B4D27B9CB",
  "this.overlay_AE6C3EA0_B419_E948_41DB_BCDDE422866C",
  "this.overlay_7C998C58_698D_C286_41A5_1ADB3EA67B94",
  "this.popup_7C0E8F0F_69F2_5E99_41B1_4AB4B4132415"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -133.03,
   "backwardYaw": 93.73,
   "distance": 1,
   "panorama": "this.panorama_A7BEAAF4_B43F_EEC9_41D7_7EF99E7900B7"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 36.07,
   "backwardYaw": -105.08,
   "distance": 1,
   "panorama": "this.panorama_A7BEF0A3_B43F_B94F_41B9_9975BB394A37"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 122.69,
   "backwardYaw": 33.91,
   "distance": 1,
   "panorama": "this.panorama_A7808C0B_B43F_A958_41AE_36DF5B301090"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 170.31,
   "backwardYaw": 40.92,
   "distance": 1,
   "panorama": "this.panorama_A0366EF2_B43F_E6C9_41D0_B451038B8996"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 57.71,
   "backwardYaw": -50.47,
   "distance": 1,
   "panorama": "this.panorama_A786980F_B438_A958_41CC_E1CD8D96840B"
  }
 ],
 "hfov": 360,
 "id": "panorama_A7B90CA2_B438_6949_41D9_FECD4F9980FC",
 "thumbnailUrl": "media/panorama_A7B90CA2_B438_6949_41D9_FECD4F9980FC_t.jpg",
 "label": "Camping Area General 2",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7B90CA2_B438_6949_41D9_FECD4F9980FC_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A7B90CA2_B438_6949_41D9_FECD4F9980FC_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A7B90CA2_B438_6949_41D9_FECD4F9980FC_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A7B90CA2_B438_6949_41D9_FECD4F9980FC_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7B90CA2_B438_6949_41D9_FECD4F9980FC_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A7B90CA2_B438_6949_41D9_FECD4F9980FC_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A7B90CA2_B438_6949_41D9_FECD4F9980FC_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A7B90CA2_B438_6949_41D9_FECD4F9980FC_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7B90CA2_B438_6949_41D9_FECD4F9980FC_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A7B90CA2_B438_6949_41D9_FECD4F9980FC_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A7B90CA2_B438_6949_41D9_FECD4F9980FC_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A7B90CA2_B438_6949_41D9_FECD4F9980FC_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7B90CA2_B438_6949_41D9_FECD4F9980FC_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A7B90CA2_B438_6949_41D9_FECD4F9980FC_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A7B90CA2_B438_6949_41D9_FECD4F9980FC_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A7B90CA2_B438_6949_41D9_FECD4F9980FC_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7B90CA2_B438_6949_41D9_FECD4F9980FC_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A7B90CA2_B438_6949_41D9_FECD4F9980FC_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A7B90CA2_B438_6949_41D9_FECD4F9980FC_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A7B90CA2_B438_6949_41D9_FECD4F9980FC_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7B90CA2_B438_6949_41D9_FECD4F9980FC_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A7B90CA2_B438_6949_41D9_FECD4F9980FC_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A7B90CA2_B438_6949_41D9_FECD4F9980FC_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A7B90CA2_B438_6949_41D9_FECD4F9980FC_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A7B90CA2_B438_6949_41D9_FECD4F9980FC_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_AC13AEEB_B4F9_E6D8_41C5_D67EEFB81BCB",
  "this.overlay_ADB6B839_B4E8_E9B8_41D3_0344D8A3678C",
  "this.overlay_7198FA7B_6992_477E_41D9_A0DE0FAEF8DA",
  "this.overlay_736E6D78_6996_FD7A_41C1_7409ECA33931",
  "this.overlay_73679BB5_698D_C5F5_41D0_ED627BE8C5AF"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 89.87,
   "backwardYaw": -91.6,
   "distance": 1,
   "panorama": "this.panorama_7EA21F0F_7498_5C6A_41D8_19929C3AC58B"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 41.68,
   "backwardYaw": 96.93,
   "distance": 1,
   "panorama": "this.panorama_A78661E2_B438_7AC9_41D6_BADE776856B8"
  }
 ],
 "hfov": 360,
 "id": "panorama_7ECAB660_7498_4CD6_41D4_1A5A06463D23",
 "thumbnailUrl": "media/panorama_7ECAB660_7498_4CD6_41D4_1A5A06463D23_t.jpg",
 "label": "Road To The Lake 6",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7ECAB660_7498_4CD6_41D4_1A5A06463D23_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_7ECAB660_7498_4CD6_41D4_1A5A06463D23_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_7ECAB660_7498_4CD6_41D4_1A5A06463D23_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7ECAB660_7498_4CD6_41D4_1A5A06463D23_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7ECAB660_7498_4CD6_41D4_1A5A06463D23_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_7ECAB660_7498_4CD6_41D4_1A5A06463D23_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_7ECAB660_7498_4CD6_41D4_1A5A06463D23_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7ECAB660_7498_4CD6_41D4_1A5A06463D23_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7ECAB660_7498_4CD6_41D4_1A5A06463D23_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_7ECAB660_7498_4CD6_41D4_1A5A06463D23_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_7ECAB660_7498_4CD6_41D4_1A5A06463D23_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7ECAB660_7498_4CD6_41D4_1A5A06463D23_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7ECAB660_7498_4CD6_41D4_1A5A06463D23_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_7ECAB660_7498_4CD6_41D4_1A5A06463D23_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_7ECAB660_7498_4CD6_41D4_1A5A06463D23_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7ECAB660_7498_4CD6_41D4_1A5A06463D23_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7ECAB660_7498_4CD6_41D4_1A5A06463D23_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_7ECAB660_7498_4CD6_41D4_1A5A06463D23_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_7ECAB660_7498_4CD6_41D4_1A5A06463D23_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7ECAB660_7498_4CD6_41D4_1A5A06463D23_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7ECAB660_7498_4CD6_41D4_1A5A06463D23_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_7ECAB660_7498_4CD6_41D4_1A5A06463D23_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_7ECAB660_7498_4CD6_41D4_1A5A06463D23_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7ECAB660_7498_4CD6_41D4_1A5A06463D23_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7ECAB660_7498_4CD6_41D4_1A5A06463D23_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_A46071E8_B428_BADA_41E1_5278213F5ECA",
  "this.overlay_AFE1B4A2_B418_5948_41DE_A751E24BA353",
  "this.overlay_7D02EC52_6993_C285_41D3_31BE595E80D8",
  "this.popup_7C964E13_6993_DE8B_41CF_AEBF7D02752C"
 ]
},
{
 "class": "FadeOutEffect",
 "duration": 1000,
 "id": "effect_7C16D668_69B2_CE83_41B8_40EC1A4EDC42",
 "easing": "cubic_in_out"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 0.52,
   "backwardYaw": -8.7,
   "distance": 1,
   "panorama": "this.panorama_A78661E2_B438_7AC9_41D6_BADE776856B8"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 94.1,
   "backwardYaw": -98.23,
   "distance": 1,
   "panorama": "this.panorama_A7924FCC_B438_A6D8_41E4_F69093B7B763"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -85.64,
   "backwardYaw": -0.57,
   "distance": 1,
   "panorama": "this.panorama_7EA21F0F_7498_5C6A_41D8_19929C3AC58B"
  }
 ],
 "hfov": 360,
 "id": "panorama_A7B91B96_B438_EF49_41D0_EA4C08E176A7",
 "thumbnailUrl": "media/panorama_A7B91B96_B438_EF49_41D0_EA4C08E176A7_t.jpg",
 "label": "Temple 3",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7B91B96_B438_EF49_41D0_EA4C08E176A7_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A7B91B96_B438_EF49_41D0_EA4C08E176A7_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A7B91B96_B438_EF49_41D0_EA4C08E176A7_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A7B91B96_B438_EF49_41D0_EA4C08E176A7_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7B91B96_B438_EF49_41D0_EA4C08E176A7_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A7B91B96_B438_EF49_41D0_EA4C08E176A7_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A7B91B96_B438_EF49_41D0_EA4C08E176A7_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A7B91B96_B438_EF49_41D0_EA4C08E176A7_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7B91B96_B438_EF49_41D0_EA4C08E176A7_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A7B91B96_B438_EF49_41D0_EA4C08E176A7_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A7B91B96_B438_EF49_41D0_EA4C08E176A7_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A7B91B96_B438_EF49_41D0_EA4C08E176A7_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7B91B96_B438_EF49_41D0_EA4C08E176A7_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A7B91B96_B438_EF49_41D0_EA4C08E176A7_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A7B91B96_B438_EF49_41D0_EA4C08E176A7_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A7B91B96_B438_EF49_41D0_EA4C08E176A7_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7B91B96_B438_EF49_41D0_EA4C08E176A7_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A7B91B96_B438_EF49_41D0_EA4C08E176A7_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A7B91B96_B438_EF49_41D0_EA4C08E176A7_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A7B91B96_B438_EF49_41D0_EA4C08E176A7_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7B91B96_B438_EF49_41D0_EA4C08E176A7_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A7B91B96_B438_EF49_41D0_EA4C08E176A7_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A7B91B96_B438_EF49_41D0_EA4C08E176A7_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A7B91B96_B438_EF49_41D0_EA4C08E176A7_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A7B91B96_B438_EF49_41D0_EA4C08E176A7_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_AE06C0F6_B419_DAC8_41E3_C2042FE8AA16",
  "this.overlay_C84C3826_DE7B_43BC_41A8_69C4EBF067D0",
  "this.overlay_C97D9BA9_DE76_C4B4_41C0_57E64120280B"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -101.67,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_B4F3AAB1_BB3F_7AA4_41C9_2EF70DC08390"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_7ECAB660_7498_4CD6_41D4_1A5A06463D23_camera"
},
{
 "rotationY": 0,
 "class": "PopupPanoramaOverlay",
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 4.32,
 "id": "popup_7CF23DAF_6992_5D9C_41CC_1C47C22202CD",
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_7CF23DAF_6992_5D9C_41CC_1C47C22202CD_0_1.jpg",
    "class": "ImageResourceLevel",
    "width": 1024,
    "height": 723
   }
  ]
 },
 "pitch": -8.85,
 "yaw": 12.57,
 "hideDuration": 500,
 "popupDistance": 100
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 93.27,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_B42B09CD_BB3F_66FC_419C_59E30AEEB687"
},
{
 "rotationY": 0,
 "class": "PopupPanoramaOverlay",
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 5.31,
 "id": "popup_7E2894E8_69F6_4387_41D1_B8D6C9AF71B4",
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_7E2894E8_69F6_4387_41D1_B8D6C9AF71B4_0_1.jpg",
    "class": "ImageResourceLevel",
    "width": 1024,
    "height": 723
   }
  ]
 },
 "pitch": -3.59,
 "yaw": -46.6,
 "hideDuration": 500,
 "popupDistance": 100
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 121.31,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_B59D4BCA_BB3F_7AE4_41D1_F0C287993F14"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -92.14,
   "backwardYaw": 68.36,
   "distance": 1,
   "panorama": "this.panorama_7EA62FDF_7498_7BEB_41B0_E9C030E0910C"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -85.91,
   "backwardYaw": 86.09,
   "distance": 1,
   "panorama": "this.panorama_A7B96437_B438_B9B7_41D3_8359BF07DA8B"
  }
 ],
 "hfov": 360,
 "id": "panorama_7FD5281A_7498_4475_41D5_125CE4CC7753",
 "thumbnailUrl": "media/panorama_7FD5281A_7498_4475_41D5_125CE4CC7753_t.jpg",
 "label": "Road To The Lake 1",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD5281A_7498_4475_41D5_125CE4CC7753_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_7FD5281A_7498_4475_41D5_125CE4CC7753_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_7FD5281A_7498_4475_41D5_125CE4CC7753_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD5281A_7498_4475_41D5_125CE4CC7753_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD5281A_7498_4475_41D5_125CE4CC7753_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_7FD5281A_7498_4475_41D5_125CE4CC7753_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_7FD5281A_7498_4475_41D5_125CE4CC7753_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD5281A_7498_4475_41D5_125CE4CC7753_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD5281A_7498_4475_41D5_125CE4CC7753_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_7FD5281A_7498_4475_41D5_125CE4CC7753_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_7FD5281A_7498_4475_41D5_125CE4CC7753_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD5281A_7498_4475_41D5_125CE4CC7753_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD5281A_7498_4475_41D5_125CE4CC7753_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_7FD5281A_7498_4475_41D5_125CE4CC7753_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_7FD5281A_7498_4475_41D5_125CE4CC7753_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD5281A_7498_4475_41D5_125CE4CC7753_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD5281A_7498_4475_41D5_125CE4CC7753_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_7FD5281A_7498_4475_41D5_125CE4CC7753_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_7FD5281A_7498_4475_41D5_125CE4CC7753_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD5281A_7498_4475_41D5_125CE4CC7753_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD5281A_7498_4475_41D5_125CE4CC7753_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_7FD5281A_7498_4475_41D5_125CE4CC7753_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_7FD5281A_7498_4475_41D5_125CE4CC7753_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7FD5281A_7498_4475_41D5_125CE4CC7753_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7FD5281A_7498_4475_41D5_125CE4CC7753_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_79A5D33B_7498_C4AB_41D2_6916334D3130",
  "this.overlay_A0C05168_B43B_DBD8_41E2_6469E05FC354"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 104.23,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_B5E3398B_BB3F_6764_41DF_EA33D0586985"
},
{
 "rotationY": 0,
 "class": "PopupPanoramaOverlay",
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 2.73,
 "id": "popup_7D9DDA2B_6995_C69B_41D9_5DF1519FB31C",
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_7D9DDA2B_6995_C69B_41D9_5DF1519FB31C_0_1.jpg",
    "class": "ImageResourceLevel",
    "width": 1024,
    "height": 723
   }
  ]
 },
 "pitch": -20.63,
 "yaw": 13.15,
 "hideDuration": 500,
 "popupDistance": 100
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 74.92,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_B56F08BD_BB3F_669C_41DF_77491EB401BF"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -43.09,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_AB389AF2_BB3F_7AA4_41CB_10DE375D4278"
},
{
 "class": "ImageResource",
 "id": "ImageResource_70BCB08C_69F2_439F_41C4_EAC3EA88E980",
 "levels": [
  {
   "url": "media/popup_7D4732AE_6992_479A_41D8_34FF02FF2036_0_0.jpg",
   "class": "ImageResourceLevel",
   "width": 1600,
   "height": 1131
  },
  {
   "url": "media/popup_7D4732AE_6992_479A_41D8_34FF02FF2036_0_1.jpg",
   "class": "ImageResourceLevel",
   "width": 1024,
   "height": 723
  },
  {
   "url": "media/popup_7D4732AE_6992_479A_41D8_34FF02FF2036_0_2.jpg",
   "class": "ImageResourceLevel",
   "width": 512,
   "height": 361
  }
 ]
},
{
 "class": "ImageResource",
 "id": "ImageResource_70AFE098_69F2_4387_41D4_0C8536919AA2",
 "levels": [
  {
   "url": "media/popup_7D9DDA2B_6995_C69B_41D9_5DF1519FB31C_0_0.jpg",
   "class": "ImageResourceLevel",
   "width": 1600,
   "height": 1131
  },
  {
   "url": "media/popup_7D9DDA2B_6995_C69B_41D9_5DF1519FB31C_0_1.jpg",
   "class": "ImageResourceLevel",
   "width": 1024,
   "height": 723
  },
  {
   "url": "media/popup_7D9DDA2B_6995_C69B_41D9_5DF1519FB31C_0_2.jpg",
   "class": "ImageResourceLevel",
   "width": 512,
   "height": 361
  }
 ]
},
{
 "class": "ImageResource",
 "id": "ImageResource_70BF008C_69F2_439F_41D1_93D689E4DA4B",
 "levels": [
  {
   "url": "media/popup_7F8DA5E4_6996_4D8E_41B3_CECE4ACA7501_0_0.jpg",
   "class": "ImageResourceLevel",
   "width": 1600,
   "height": 1131
  },
  {
   "url": "media/popup_7F8DA5E4_6996_4D8E_41B3_CECE4ACA7501_0_1.jpg",
   "class": "ImageResourceLevel",
   "width": 1024,
   "height": 723
  },
  {
   "url": "media/popup_7F8DA5E4_6996_4D8E_41B3_CECE4ACA7501_0_2.jpg",
   "class": "ImageResourceLevel",
   "width": 512,
   "height": 361
  }
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 162.87,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_ABA4BB65_BB3F_7BAC_41DE_213EE9FC1DA8"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -146.09,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_B568D8D0_BB3F_66E4_41CA_2F7AB8351FAE"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 136.08,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_AA82A805_BB3F_656C_41E3_713FA46C7036"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -2.49,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_B4730A08_BB3F_6563_41E1_33946EE9026F"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -111.64,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_AAB9A818_BB3F_6564_41DA_EC8EA81A9C5B"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -85.9,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_B5926900_BB3F_6764_41D5_91A7968B0378"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -178.1,
   "backwardYaw": 74.81,
   "distance": 1,
   "panorama": "this.panorama_A7924FCC_B438_A6D8_41E4_F69093B7B763"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -75.77,
   "backwardYaw": 78.33,
   "distance": 1,
   "panorama": "this.panorama_A0366EF2_B43F_E6C9_41D0_B451038B8996"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 112.27,
   "backwardYaw": -86.92,
   "distance": 1,
   "panorama": "this.panorama_A786980F_B438_A958_41CC_E1CD8D96840B"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -29.74,
   "backwardYaw": 146.2,
   "distance": 1,
   "panorama": "this.panorama_A78285F6_B43F_DAC9_41D5_DC8F7DA52DC0"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 33.91,
   "backwardYaw": 122.69,
   "distance": 1,
   "panorama": "this.panorama_A7B90CA2_B438_6949_41D9_FECD4F9980FC"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -37.44,
   "backwardYaw": 136.91,
   "distance": 1,
   "panorama": "this.panorama_A7BEAAF4_B43F_EEC9_41D7_7EF99E7900B7"
  }
 ],
 "hfov": 360,
 "id": "panorama_A7808C0B_B43F_A958_41AE_36DF5B301090",
 "thumbnailUrl": "media/panorama_A7808C0B_B43F_A958_41AE_36DF5B301090_t.jpg",
 "label": "Camping Area General 1",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7808C0B_B43F_A958_41AE_36DF5B301090_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A7808C0B_B43F_A958_41AE_36DF5B301090_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A7808C0B_B43F_A958_41AE_36DF5B301090_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A7808C0B_B43F_A958_41AE_36DF5B301090_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7808C0B_B43F_A958_41AE_36DF5B301090_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A7808C0B_B43F_A958_41AE_36DF5B301090_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A7808C0B_B43F_A958_41AE_36DF5B301090_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A7808C0B_B43F_A958_41AE_36DF5B301090_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7808C0B_B43F_A958_41AE_36DF5B301090_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A7808C0B_B43F_A958_41AE_36DF5B301090_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A7808C0B_B43F_A958_41AE_36DF5B301090_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A7808C0B_B43F_A958_41AE_36DF5B301090_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7808C0B_B43F_A958_41AE_36DF5B301090_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A7808C0B_B43F_A958_41AE_36DF5B301090_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A7808C0B_B43F_A958_41AE_36DF5B301090_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A7808C0B_B43F_A958_41AE_36DF5B301090_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7808C0B_B43F_A958_41AE_36DF5B301090_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A7808C0B_B43F_A958_41AE_36DF5B301090_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A7808C0B_B43F_A958_41AE_36DF5B301090_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A7808C0B_B43F_A958_41AE_36DF5B301090_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7808C0B_B43F_A958_41AE_36DF5B301090_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A7808C0B_B43F_A958_41AE_36DF5B301090_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A7808C0B_B43F_A958_41AE_36DF5B301090_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A7808C0B_B43F_A958_41AE_36DF5B301090_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A7808C0B_B43F_A958_41AE_36DF5B301090_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_A8D83B87_B4E9_AF57_41E2_C77EE6622707",
  "this.overlay_AD1DE70F_B419_E758_41AF_C7AEF3E91D89",
  "this.overlay_A822F1B2_B42B_DB4B_41E5_988C7C7F29EB",
  "this.overlay_AB7C80D2_B418_FACB_4195_CC262FE9BF44",
  "this.overlay_947D1840_B41F_A9C7_41E1_0372229789D1",
  "this.overlay_95025D04_B418_AB4E_41E2_378B29D65B8B",
  "this.overlay_7F11328C_69F6_4798_41D6_EB357408A9A8",
  "this.popup_7E2894E8_69F6_4387_41D1_B8D6C9AF71B4"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_95CD3E53_B439_A9C9_41BB_810EAA1DFE58_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 89.41,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_B5F98974_BB3F_67AC_41C2_54D321481E09"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 96.62,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_B40369B6_BB3F_66AC_41DB_73B4BCA036E9"
},
{
 "class": "PanoramaPlayer",
 "buttonCardboardView": "this.Button_4D1C404A_5A87_C3B6_41BC_63B811C40CD0",
 "displayPlaybackBar": true,
 "viewerArea": "this.MainViewer",
 "touchControlMode": "drag_rotation",
 "id": "MainViewerPanoramaPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "mouseControlMode": "drag_acceleration"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -83.07,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_B5D9C951_BB3F_67E4_41DF_DA812FE660D5"
},
{
 "rotationY": 0,
 "class": "PopupPanoramaOverlay",
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 5.31,
 "id": "popup_7F8DA5E4_6996_4D8E_41B3_CECE4ACA7501",
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_7F8DA5E4_6996_4D8E_41B3_CECE4ACA7501_0_1.jpg",
    "class": "ImageResourceLevel",
    "width": 1024,
    "height": 723
   }
  ]
 },
 "pitch": 3.47,
 "yaw": -82.93,
 "hideDuration": 500,
 "popupDistance": 100
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 87.86,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_B58D290D_BB3F_677C_41A0_C007CE5FA2EF"
},
{
 "class": "ImageResource",
 "id": "ImageResource_70A81098_69F2_4387_41D9_51321BAD9FD9",
 "levels": [
  {
   "url": "media/popup_7DBE1BE6_6992_C58C_41D9_D3946B1A5DFD_0_0.jpg",
   "class": "ImageResourceLevel",
   "width": 1600,
   "height": 1131
  },
  {
   "url": "media/popup_7DBE1BE6_6992_C58C_41D9_D3946B1A5DFD_0_1.jpg",
   "class": "ImageResourceLevel",
   "width": 1024,
   "height": 723
  },
  {
   "url": "media/popup_7DBE1BE6_6992_C58C_41D9_D3946B1A5DFD_0_2.jpg",
   "class": "ImageResourceLevel",
   "width": 512,
   "height": 361
  }
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 46.97,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_AA8E67F1_BB3F_6AA4_41E2_73A5A7869D53"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -9.69,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_B4191998_BB3F_6764_41D4_40253A313F26"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -179.48,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_AB2B9AFC_BB3F_7A9C_41C6_FAB77B3DCF5E"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 81.54,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_AB657B34_BB3F_7BAC_41E1_497E38CD763A"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 171.3,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_AAA5283C_BB3F_659C_41D6_C17A83A6B1A4"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 179.43,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_B578A89F_BB3F_669C_41B6_874CE6F71991"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 150.26,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_ABB58B5B_BB3F_7BE4_41B5_DEA41D1A6B5D"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -7.82,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_B40D09A9_BB3F_66A4_41B6_704565304B5B"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_A7924FCC_B438_A6D8_41E4_F69093B7B763_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_A7BEF0A3_B43F_B94F_41B9_9975BB394A37_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 129.53,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_B59F38E8_BB3F_66A4_41D8_48E5929920A8"
},
{
 "class": "ImageResource",
 "id": "ImageResource_70ABF095_69F2_4389_41CC_F8DA354709AD",
 "levels": [
  {
   "url": "media/popup_7F3248F5_6993_C38E_41D3_4522D27990C6_0_0.jpg",
   "class": "ImageResourceLevel",
   "width": 1600,
   "height": 1131
  },
  {
   "url": "media/popup_7F3248F5_6993_C38E_41D3_4522D27990C6_0_1.jpg",
   "class": "ImageResourceLevel",
   "width": 1024,
   "height": 723
  },
  {
   "url": "media/popup_7F3248F5_6993_C38E_41D3_4522D27990C6_0_2.jpg",
   "class": "ImageResourceLevel",
   "width": 512,
   "height": 361
  }
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_A7B91B96_B438_EF49_41D0_EA4C08E176A7_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 71.03,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_B497CA1D_BB3F_659C_41D4_6773902634D1"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_A0366EF2_B43F_E6C9_41D0_B451038B8996_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -83.31,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_AB82AB52_BB3F_7BE4_41A9_D6462D6B1858"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 143.83,
   "backwardYaw": -20.14,
   "distance": 1,
   "panorama": "this.panorama_A7B96437_B438_B9B7_41D3_8359BF07DA8B"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -58.69,
   "backwardYaw": 108.88,
   "distance": 1,
   "panorama": "this.panorama_A786980F_B438_A958_41CC_E1CD8D96840B"
  }
 ],
 "hfov": 360,
 "id": "panorama_A7B936D4_B438_66C8_41D7_BBFCC5890205",
 "thumbnailUrl": "media/panorama_A7B936D4_B438_66C8_41D7_BBFCC5890205_t.jpg",
 "label": "Behind The Locket",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7B936D4_B438_66C8_41D7_BBFCC5890205_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A7B936D4_B438_66C8_41D7_BBFCC5890205_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A7B936D4_B438_66C8_41D7_BBFCC5890205_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A7B936D4_B438_66C8_41D7_BBFCC5890205_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7B936D4_B438_66C8_41D7_BBFCC5890205_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A7B936D4_B438_66C8_41D7_BBFCC5890205_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A7B936D4_B438_66C8_41D7_BBFCC5890205_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A7B936D4_B438_66C8_41D7_BBFCC5890205_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7B936D4_B438_66C8_41D7_BBFCC5890205_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A7B936D4_B438_66C8_41D7_BBFCC5890205_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A7B936D4_B438_66C8_41D7_BBFCC5890205_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A7B936D4_B438_66C8_41D7_BBFCC5890205_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7B936D4_B438_66C8_41D7_BBFCC5890205_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A7B936D4_B438_66C8_41D7_BBFCC5890205_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A7B936D4_B438_66C8_41D7_BBFCC5890205_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A7B936D4_B438_66C8_41D7_BBFCC5890205_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7B936D4_B438_66C8_41D7_BBFCC5890205_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A7B936D4_B438_66C8_41D7_BBFCC5890205_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A7B936D4_B438_66C8_41D7_BBFCC5890205_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A7B936D4_B438_66C8_41D7_BBFCC5890205_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7B936D4_B438_66C8_41D7_BBFCC5890205_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A7B936D4_B438_66C8_41D7_BBFCC5890205_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A7B936D4_B438_66C8_41D7_BBFCC5890205_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A7B936D4_B438_66C8_41D7_BBFCC5890205_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A7B936D4_B438_66C8_41D7_BBFCC5890205_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_A2DF9CC2_B42B_AAC8_41E1_4A02D154134A",
  "this.overlay_7E1E3C15_6992_428B_41DA_5F90658F78B8"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -138.32,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_AB5C5B07_BB3F_7B6C_41D4_ADE5210A03B0"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 78.33,
   "backwardYaw": -75.77,
   "distance": 1,
   "panorama": "this.panorama_A7808C0B_B43F_A958_41AE_36DF5B301090"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 40.92,
   "backwardYaw": 170.31,
   "distance": 1,
   "panorama": "this.panorama_A7B90CA2_B438_6949_41D9_FECD4F9980FC"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -43.92,
   "backwardYaw": 172.18,
   "distance": 1,
   "panorama": "this.panorama_A7BEAAF4_B43F_EEC9_41D7_7EF99E7900B7"
  }
 ],
 "hfov": 360,
 "id": "panorama_A0366EF2_B43F_E6C9_41D0_B451038B8996",
 "thumbnailUrl": "media/panorama_A0366EF2_B43F_E6C9_41D0_B451038B8996_t.jpg",
 "label": "Camping Area 1",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A0366EF2_B43F_E6C9_41D0_B451038B8996_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A0366EF2_B43F_E6C9_41D0_B451038B8996_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A0366EF2_B43F_E6C9_41D0_B451038B8996_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A0366EF2_B43F_E6C9_41D0_B451038B8996_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A0366EF2_B43F_E6C9_41D0_B451038B8996_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A0366EF2_B43F_E6C9_41D0_B451038B8996_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A0366EF2_B43F_E6C9_41D0_B451038B8996_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A0366EF2_B43F_E6C9_41D0_B451038B8996_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A0366EF2_B43F_E6C9_41D0_B451038B8996_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A0366EF2_B43F_E6C9_41D0_B451038B8996_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A0366EF2_B43F_E6C9_41D0_B451038B8996_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A0366EF2_B43F_E6C9_41D0_B451038B8996_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A0366EF2_B43F_E6C9_41D0_B451038B8996_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A0366EF2_B43F_E6C9_41D0_B451038B8996_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A0366EF2_B43F_E6C9_41D0_B451038B8996_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A0366EF2_B43F_E6C9_41D0_B451038B8996_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A0366EF2_B43F_E6C9_41D0_B451038B8996_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A0366EF2_B43F_E6C9_41D0_B451038B8996_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A0366EF2_B43F_E6C9_41D0_B451038B8996_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A0366EF2_B43F_E6C9_41D0_B451038B8996_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A0366EF2_B43F_E6C9_41D0_B451038B8996_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A0366EF2_B43F_E6C9_41D0_B451038B8996_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A0366EF2_B43F_E6C9_41D0_B451038B8996_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A0366EF2_B43F_E6C9_41D0_B451038B8996_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A0366EF2_B43F_E6C9_41D0_B451038B8996_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_A8789C2A_B428_A958_41D5_E96C3F71EE83",
  "this.overlay_7C233174_6996_428E_41C5_32B1E250B4FD",
  "this.popup_7F8DA5E4_6996_4D8E_41B3_CECE4ACA7501",
  "this.overlay_72D6B834_69B2_C28B_41CD_DFFC2E0DD370",
  "this.overlay_72131461_69B6_428C_41B1_1E8451E0886C"
 ]
},
{
 "rotationY": 0,
 "class": "PopupPanoramaOverlay",
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 5.29,
 "id": "popup_7C964E13_6993_DE8B_41CF_AEBF7D02752C",
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_7C964E13_6993_DE8B_41CF_AEBF7D02752C_0_1.jpg",
    "class": "ImageResourceLevel",
    "width": 1024,
    "height": 723
   }
  ]
 },
 "pitch": -6.03,
 "yaw": -153.76,
 "hideDuration": 500,
 "popupDistance": 100
},
{
 "class": "ImageResource",
 "id": "ImageResource_70BD408C_69F2_439F_41C2_79E3939BEFB8",
 "levels": [
  {
   "url": "media/popup_7C8727FE_6996_4D7A_41D9_7D0E3E50B5AB_0_0.jpg",
   "class": "ImageResourceLevel",
   "width": 1600,
   "height": 1131
  },
  {
   "url": "media/popup_7C8727FE_6996_4D7A_41D9_7D0E3E50B5AB_0_1.jpg",
   "class": "ImageResourceLevel",
   "width": 1024,
   "height": 723
  },
  {
   "url": "media/popup_7C8727FE_6996_4D7A_41D9_7D0E3E50B5AB_0_2.jpg",
   "class": "ImageResourceLevel",
   "width": 512,
   "height": 361
  }
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_7EC7D790_7498_4C75_41CB_BD28A22679B2_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -67.73,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_ABC9BB7A_BB3F_7BA4_41C2_51C3C7FBD52F"
},
{
 "class": "ImageResource",
 "id": "ImageResource_70AD9098_69F2_4387_41CF_A445F18B4FB7",
 "levels": [
  {
   "url": "media/popup_7CE8CBE5_6992_C58F_41CF_69F433BB960C_0_0.jpg",
   "class": "ImageResourceLevel",
   "width": 1600,
   "height": 1131
  },
  {
   "url": "media/popup_7CE8CBE5_6992_C58F_41CF_69F433BB960C_0_1.jpg",
   "class": "ImageResourceLevel",
   "width": 1024,
   "height": 723
  },
  {
   "url": "media/popup_7CE8CBE5_6992_C58F_41CF_69F433BB960C_0_2.jpg",
   "class": "ImageResourceLevel",
   "width": 512,
   "height": 361
  }
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 146.2,
   "backwardYaw": -29.74,
   "distance": 1,
   "panorama": "this.panorama_A7808C0B_B43F_A958_41AE_36DF5B301090"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 166.83,
   "backwardYaw": -17.13,
   "distance": 1,
   "panorama": "this.panorama_A7BEAAF4_B43F_EEC9_41D7_7EF99E7900B7"
  }
 ],
 "hfov": 360,
 "id": "panorama_A78285F6_B43F_DAC9_41D5_DC8F7DA52DC0",
 "thumbnailUrl": "media/panorama_A78285F6_B43F_DAC9_41D5_DC8F7DA52DC0_t.jpg",
 "label": "Camping Area 3",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A78285F6_B43F_DAC9_41D5_DC8F7DA52DC0_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A78285F6_B43F_DAC9_41D5_DC8F7DA52DC0_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A78285F6_B43F_DAC9_41D5_DC8F7DA52DC0_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A78285F6_B43F_DAC9_41D5_DC8F7DA52DC0_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A78285F6_B43F_DAC9_41D5_DC8F7DA52DC0_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A78285F6_B43F_DAC9_41D5_DC8F7DA52DC0_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A78285F6_B43F_DAC9_41D5_DC8F7DA52DC0_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A78285F6_B43F_DAC9_41D5_DC8F7DA52DC0_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A78285F6_B43F_DAC9_41D5_DC8F7DA52DC0_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A78285F6_B43F_DAC9_41D5_DC8F7DA52DC0_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A78285F6_B43F_DAC9_41D5_DC8F7DA52DC0_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A78285F6_B43F_DAC9_41D5_DC8F7DA52DC0_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A78285F6_B43F_DAC9_41D5_DC8F7DA52DC0_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A78285F6_B43F_DAC9_41D5_DC8F7DA52DC0_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A78285F6_B43F_DAC9_41D5_DC8F7DA52DC0_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A78285F6_B43F_DAC9_41D5_DC8F7DA52DC0_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A78285F6_B43F_DAC9_41D5_DC8F7DA52DC0_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A78285F6_B43F_DAC9_41D5_DC8F7DA52DC0_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A78285F6_B43F_DAC9_41D5_DC8F7DA52DC0_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A78285F6_B43F_DAC9_41D5_DC8F7DA52DC0_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A78285F6_B43F_DAC9_41D5_DC8F7DA52DC0_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A78285F6_B43F_DAC9_41D5_DC8F7DA52DC0_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A78285F6_B43F_DAC9_41D5_DC8F7DA52DC0_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A78285F6_B43F_DAC9_41D5_DC8F7DA52DC0_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A78285F6_B43F_DAC9_41D5_DC8F7DA52DC0_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_AA87AB3D_B418_AFB8_41DC_C2487DBA1864",
  "this.overlay_944774CF_B41B_DAD9_41D8_F7376342BF52",
  "this.overlay_7C5B620B_6995_C699_41A8_9FF7C9C3D30D",
  "this.popup_7D4732AE_6992_479A_41D8_34FF02FF2036"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": "this.sequence_74510F9A_6993_DDBC_41CF_70A289805155",
 "id": "panorama_95C99373_B439_DFC9_41CF_DBA77EFE762A_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_7EA62FDF_7498_7BEB_41B0_E9C030E0910C_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -86.27,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_B57508AC_BB3F_66BC_41E3_82F622BF23A4"
},
{
 "hfovMax": 130,
 "class": "Panorama",
 "partial": false,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_95EBABAF_B439_AF59_41E0_DD8AB662F458_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_95EBABAF_B439_AF59_41E0_DD8AB662F458_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_95EBABAF_B439_AF59_41E0_DD8AB662F458_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_95EBABAF_B439_AF59_41E0_DD8AB662F458_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_95EBABAF_B439_AF59_41E0_DD8AB662F458_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_95EBABAF_B439_AF59_41E0_DD8AB662F458_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_95EBABAF_B439_AF59_41E0_DD8AB662F458_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_95EBABAF_B439_AF59_41E0_DD8AB662F458_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_95EBABAF_B439_AF59_41E0_DD8AB662F458_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_95EBABAF_B439_AF59_41E0_DD8AB662F458_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_95EBABAF_B439_AF59_41E0_DD8AB662F458_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_95EBABAF_B439_AF59_41E0_DD8AB662F458_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_95EBABAF_B439_AF59_41E0_DD8AB662F458_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_95EBABAF_B439_AF59_41E0_DD8AB662F458_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_95EBABAF_B439_AF59_41E0_DD8AB662F458_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_95EBABAF_B439_AF59_41E0_DD8AB662F458_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_95EBABAF_B439_AF59_41E0_DD8AB662F458_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_95EBABAF_B439_AF59_41E0_DD8AB662F458_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_95EBABAF_B439_AF59_41E0_DD8AB662F458_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_95EBABAF_B439_AF59_41E0_DD8AB662F458_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_95EBABAF_B439_AF59_41E0_DD8AB662F458_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_95EBABAF_B439_AF59_41E0_DD8AB662F458_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_95EBABAF_B439_AF59_41E0_DD8AB662F458_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_95EBABAF_B439_AF59_41E0_DD8AB662F458_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_95EBABAF_B439_AF59_41E0_DD8AB662F458_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "Wide Area Drone 2",
 "id": "panorama_95EBABAF_B439_AF59_41E0_DD8AB662F458",
 "thumbnailUrl": "media/panorama_95EBABAF_B439_AF59_41E0_DD8AB662F458_t.jpg",
 "hfovMin": "120%",
 "pitch": 0
},
{
 "partial": false,
 "id": "panorama_95EBD687_B439_F94A_41D8_B3A956CC1C1A",
 "thumbnailUrl": "media/panorama_95EBD687_B439_F94A_41D8_B3A956CC1C1A_t.jpg",
 "hfov": 360,
 "label": "High View Temple Drone",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_95EBD687_B439_F94A_41D8_B3A956CC1C1A_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_95EBD687_B439_F94A_41D8_B3A956CC1C1A_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_95EBD687_B439_F94A_41D8_B3A956CC1C1A_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_95EBD687_B439_F94A_41D8_B3A956CC1C1A_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_95EBD687_B439_F94A_41D8_B3A956CC1C1A_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_95EBD687_B439_F94A_41D8_B3A956CC1C1A_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_95EBD687_B439_F94A_41D8_B3A956CC1C1A_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_95EBD687_B439_F94A_41D8_B3A956CC1C1A_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_95EBD687_B439_F94A_41D8_B3A956CC1C1A_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_95EBD687_B439_F94A_41D8_B3A956CC1C1A_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_95EBD687_B439_F94A_41D8_B3A956CC1C1A_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_95EBD687_B439_F94A_41D8_B3A956CC1C1A_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_95EBD687_B439_F94A_41D8_B3A956CC1C1A_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_95EBD687_B439_F94A_41D8_B3A956CC1C1A_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_95EBD687_B439_F94A_41D8_B3A956CC1C1A_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_95EBD687_B439_F94A_41D8_B3A956CC1C1A_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_95EBD687_B439_F94A_41D8_B3A956CC1C1A_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_95EBD687_B439_F94A_41D8_B3A956CC1C1A_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_95EBD687_B439_F94A_41D8_B3A956CC1C1A_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_95EBD687_B439_F94A_41D8_B3A956CC1C1A_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_95EBD687_B439_F94A_41D8_B3A956CC1C1A_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_95EBD687_B439_F94A_41D8_B3A956CC1C1A_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_95EBD687_B439_F94A_41D8_B3A956CC1C1A_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_95EBD687_B439_F94A_41D8_B3A956CC1C1A_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_95EBD687_B439_F94A_41D8_B3A956CC1C1A_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "120%",
 "overlays": [
  "this.overlay_7DF865BB_6992_4D84_41BB_70AAAF547570",
  "this.popup_7DBE1BE6_6992_C58C_41D9_D3946B1A5DFD",
  "this.overlay_7CF03BDB_6992_45BB_41C2_C6133B0F15FF",
  "this.popup_7D9DDA2B_6995_C69B_41D9_5DF1519FB31C",
  "this.overlay_7D6E4722_6992_CE8A_41B8_787C8D0DE823",
  "this.popup_7D554A76_6992_468A_41D7_B705F950CC38"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -57.31,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_AB099AE3_BB3F_7AA4_41E2_4A874C405713"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 88.04,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_B5AC5936_BB3F_67AC_41DC_60820A7E8C1D"
},
{
 "rotationY": 0,
 "class": "PopupPanoramaOverlay",
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 3.57,
 "id": "popup_7D554A76_6992_468A_41D7_B705F950CC38",
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_7D554A76_6992_468A_41D7_B705F950CC38_0_1.jpg",
    "class": "ImageResourceLevel",
    "width": 1024,
    "height": 723
   }
  ]
 },
 "pitch": 0.48,
 "yaw": -175.74,
 "hideDuration": 500,
 "popupDistance": 100
},
{
 "rotationY": 0,
 "class": "PopupPanoramaOverlay",
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 3.63,
 "id": "popup_7CE8CBE5_6992_C58F_41CF_69F433BB960C",
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_7CE8CBE5_6992_C58F_41CF_69F433BB960C_0_1.jpg",
    "class": "ImageResourceLevel",
    "width": 1024,
    "height": 723
   }
  ]
 },
 "pitch": -9.33,
 "yaw": -36.39,
 "hideDuration": 500,
 "popupDistance": 100
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_BB4975DB_B418_FAFF_41E0_72C5A527492C_camera"
},
{
 "rotationY": 0,
 "class": "PopupPanoramaOverlay",
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 5.05,
 "id": "popup_7F1D2678_6996_4E86_41D4_B394CB6B5C99",
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_7F1D2678_6996_4E86_41D4_B394CB6B5C99_0_1.jpg",
    "class": "ImageResourceLevel",
    "width": 1024,
    "height": 723
   }
  ]
 },
 "pitch": 1.81,
 "yaw": -168.75,
 "hideDuration": 500,
 "popupDistance": 100
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -90.13,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_AB90DB48_BB3F_7BE4_41C6_38055A98A9A4"
},
{
 "class": "ImageResource",
 "id": "ImageResource_70AE9098_69F2_4387_41CF_57F01BD0ECAD",
 "levels": [
  {
   "url": "media/popup_7D554A76_6992_468A_41D7_B705F950CC38_0_0.jpg",
   "class": "ImageResourceLevel",
   "width": 1600,
   "height": 1131
  },
  {
   "url": "media/popup_7D554A76_6992_468A_41D7_B705F950CC38_0_1.jpg",
   "class": "ImageResourceLevel",
   "width": 1024,
   "height": 723
  },
  {
   "url": "media/popup_7D554A76_6992_468A_41D7_B705F950CC38_0_2.jpg",
   "class": "ImageResourceLevel",
   "width": 512,
   "height": 361
  }
 ]
},
{
 "rotationY": 0,
 "class": "PopupPanoramaOverlay",
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 3.51,
 "id": "popup_7C35A27D_6996_C77C_41B2_08BD717634D0",
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_7C35A27D_6996_C77C_41B2_08BD717634D0_0_1.jpg",
    "class": "ImageResourceLevel",
    "width": 1024,
    "height": 723
   }
  ]
 },
 "pitch": -6.57,
 "yaw": -2.51,
 "hideDuration": 500,
 "popupDistance": 100
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_BBB1C0DB_B418_7AFE_41E5_7573BE28445D_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_A786980F_B438_A958_41CC_E1CD8D96840B_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_95C2995D_B439_EBFE_41E4_BB7C848E21F6_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 17.9,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_B580D918_BB3F_6764_41D6_D4A2A120D828"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_A7B936D4_B438_66C8_41D7_BBFCC5890205_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -36.17,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_B4DCAA66_BB3F_65AC_41A6_AFCDBE7CE095"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_A7BEAAF4_B43F_EEC9_41D7_7EF99E7900B7_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 173.03,
   "backwardYaw": 170.65,
   "distance": 1,
   "panorama": "this.panorama_BBB08BDF_B418_EEF6_41B4_912FC2FCEF8E"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 11.59,
   "backwardYaw": -90.59,
   "distance": 1,
   "panorama": "this.panorama_BB4975DB_B418_FAFF_41E0_72C5A527492C"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -78.91,
   "backwardYaw": 98.78,
   "distance": 1,
   "panorama": "this.panorama_BBB1C0DB_B418_7AFE_41E5_7573BE28445D"
  }
 ],
 "hfov": 360,
 "id": "panorama_BBA93A6D_B418_A9DA_41DF_BE4E0F1A548B",
 "thumbnailUrl": "media/panorama_BBA93A6D_B418_A9DA_41DF_BE4E0F1A548B_t.jpg",
 "label": "Garden",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BBA93A6D_B418_A9DA_41DF_BE4E0F1A548B_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_BBA93A6D_B418_A9DA_41DF_BE4E0F1A548B_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BBA93A6D_B418_A9DA_41DF_BE4E0F1A548B_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BBA93A6D_B418_A9DA_41DF_BE4E0F1A548B_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BBA93A6D_B418_A9DA_41DF_BE4E0F1A548B_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_BBA93A6D_B418_A9DA_41DF_BE4E0F1A548B_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BBA93A6D_B418_A9DA_41DF_BE4E0F1A548B_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BBA93A6D_B418_A9DA_41DF_BE4E0F1A548B_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BBA93A6D_B418_A9DA_41DF_BE4E0F1A548B_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_BBA93A6D_B418_A9DA_41DF_BE4E0F1A548B_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BBA93A6D_B418_A9DA_41DF_BE4E0F1A548B_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BBA93A6D_B418_A9DA_41DF_BE4E0F1A548B_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BBA93A6D_B418_A9DA_41DF_BE4E0F1A548B_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_BBA93A6D_B418_A9DA_41DF_BE4E0F1A548B_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BBA93A6D_B418_A9DA_41DF_BE4E0F1A548B_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BBA93A6D_B418_A9DA_41DF_BE4E0F1A548B_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BBA93A6D_B418_A9DA_41DF_BE4E0F1A548B_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_BBA93A6D_B418_A9DA_41DF_BE4E0F1A548B_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BBA93A6D_B418_A9DA_41DF_BE4E0F1A548B_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BBA93A6D_B418_A9DA_41DF_BE4E0F1A548B_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BBA93A6D_B418_A9DA_41DF_BE4E0F1A548B_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_BBA93A6D_B418_A9DA_41DF_BE4E0F1A548B_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BBA93A6D_B418_A9DA_41DF_BE4E0F1A548B_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BBA93A6D_B418_A9DA_41DF_BE4E0F1A548B_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BBA93A6D_B418_A9DA_41DF_BE4E0F1A548B_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_A712BB2F_B468_AF57_41D2_496549742A54",
  "this.overlay_A655375E_B469_A7F9_41D7_F316B37EA394",
  "this.overlay_A6116F15_B478_E74A_41CE_068A01019531"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -71.12,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_B45549E3_BB3F_66A4_41DC_B34606CC9514"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_A7B90CA2_B438_6949_41D9_FECD4F9980FC_camera"
},
{
 "class": "PlayList",
 "items": [
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A7808C0B_B43F_A958_41AE_36DF5B301090_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 0, 1)",
   "media": "this.panorama_A7808C0B_B43F_A958_41AE_36DF5B301090",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A7B90CA2_B438_6949_41D9_FECD4F9980FC_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 1, 2)",
   "media": "this.panorama_A7B90CA2_B438_6949_41D9_FECD4F9980FC",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A0366EF2_B43F_E6C9_41D0_B451038B8996_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 2, 3)",
   "media": "this.panorama_A0366EF2_B43F_E6C9_41D0_B451038B8996",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A7BEAAF4_B43F_EEC9_41D7_7EF99E7900B7_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 3, 4)",
   "media": "this.panorama_A7BEAAF4_B43F_EEC9_41D7_7EF99E7900B7",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A78285F6_B43F_DAC9_41D5_DC8F7DA52DC0_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 4, 5)",
   "media": "this.panorama_A78285F6_B43F_DAC9_41D5_DC8F7DA52DC0",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A7BEF0A3_B43F_B94F_41B9_9975BB394A37_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 5, 0)",
   "media": "this.panorama_A7BEF0A3_B43F_B94F_41B9_9975BB394A37",
   "player": "this.MainViewerPanoramaPlayer"
  }
 ],
 "id": "DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist"
},
{
 "class": "ImageResource",
 "id": "ImageResource_70A92095_69F2_4389_4191_1A237B380F13",
 "levels": [
  {
   "url": "media/popup_7C35A27D_6996_C77C_41B2_08BD717634D0_0_0.jpg",
   "class": "ImageResourceLevel",
   "width": 1600,
   "height": 1131
  },
  {
   "url": "media/popup_7C35A27D_6996_C77C_41B2_08BD717634D0_0_1.jpg",
   "class": "ImageResourceLevel",
   "width": 1024,
   "height": 723
  },
  {
   "url": "media/popup_7C35A27D_6996_C77C_41B2_08BD717634D0_0_2.jpg",
   "class": "ImageResourceLevel",
   "width": 512,
   "height": 361
  }
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 88.4,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_B5A22943_BB3F_67E4_41C8_C24DACF0DE64"
},
{
 "partial": false,
 "id": "panorama_95C2995D_B439_EBFE_41E4_BB7C848E21F6",
 "thumbnailUrl": "media/panorama_95C2995D_B439_EBFE_41E4_BB7C848E21F6_t.jpg",
 "hfov": 360,
 "label": "Front View Temple Drone",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_95C2995D_B439_EBFE_41E4_BB7C848E21F6_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_95C2995D_B439_EBFE_41E4_BB7C848E21F6_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_95C2995D_B439_EBFE_41E4_BB7C848E21F6_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_95C2995D_B439_EBFE_41E4_BB7C848E21F6_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_95C2995D_B439_EBFE_41E4_BB7C848E21F6_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_95C2995D_B439_EBFE_41E4_BB7C848E21F6_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_95C2995D_B439_EBFE_41E4_BB7C848E21F6_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_95C2995D_B439_EBFE_41E4_BB7C848E21F6_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_95C2995D_B439_EBFE_41E4_BB7C848E21F6_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_95C2995D_B439_EBFE_41E4_BB7C848E21F6_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_95C2995D_B439_EBFE_41E4_BB7C848E21F6_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_95C2995D_B439_EBFE_41E4_BB7C848E21F6_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_95C2995D_B439_EBFE_41E4_BB7C848E21F6_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_95C2995D_B439_EBFE_41E4_BB7C848E21F6_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_95C2995D_B439_EBFE_41E4_BB7C848E21F6_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_95C2995D_B439_EBFE_41E4_BB7C848E21F6_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_95C2995D_B439_EBFE_41E4_BB7C848E21F6_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_95C2995D_B439_EBFE_41E4_BB7C848E21F6_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_95C2995D_B439_EBFE_41E4_BB7C848E21F6_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_95C2995D_B439_EBFE_41E4_BB7C848E21F6_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_95C2995D_B439_EBFE_41E4_BB7C848E21F6_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_95C2995D_B439_EBFE_41E4_BB7C848E21F6_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_95C2995D_B439_EBFE_41E4_BB7C848E21F6_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_95C2995D_B439_EBFE_41E4_BB7C848E21F6_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_95C2995D_B439_EBFE_41E4_BB7C848E21F6_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "120%",
 "overlays": [
  "this.overlay_7D4D868F_6996_4F9B_41AB_871E71FAEF23",
  "this.popup_7C35A27D_6996_C77C_41B2_08BD717634D0"
 ]
},
{
 "rotationY": 0,
 "class": "PopupPanoramaOverlay",
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 3.72,
 "id": "popup_7DBE1BE6_6992_C58C_41D9_D3946B1A5DFD",
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_7DBE1BE6_6992_C58C_41D9_D3946B1A5DFD_0_1.jpg",
    "class": "ImageResourceLevel",
    "width": 1024,
    "height": 723
   }
  ]
 },
 "pitch": -17.99,
 "yaw": -35.52,
 "hideDuration": 500,
 "popupDistance": 100
},
{
 "rotationY": 0,
 "class": "PopupPanoramaOverlay",
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 5.32,
 "id": "popup_7FC3EA5A_6992_46BA_41D1_DE698FE2B38C",
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_7FC3EA5A_6992_46BA_41D1_DE698FE2B38C_0_1.jpg",
    "class": "ImageResourceLevel",
    "width": 1024,
    "height": 723
   }
  ]
 },
 "pitch": 2.94,
 "yaw": -92.87,
 "hideDuration": 500,
 "popupDistance": 100
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -13.17,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_AA6257D7_BB3F_6AEC_41E1_CDCD27964FE7"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -6.97,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_B4CE4A80_BB3F_6564_41E4_C45D5B596C07"
},
{
 "class": "PlayList",
 "items": [
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A78661E2_B438_7AC9_41D6_BADE776856B8_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05783A1F_3AA3_A1D2_41A6_E88282E5373B_playlist, 0, 1)",
   "media": "this.panorama_A78661E2_B438_7AC9_41D6_BADE776856B8",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A7924FCC_B438_A6D8_41E4_F69093B7B763_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05783A1F_3AA3_A1D2_41A6_E88282E5373B_playlist, 1, 2)",
   "media": "this.panorama_A7924FCC_B438_A6D8_41E4_F69093B7B763",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A7B91B96_B438_EF49_41D0_EA4C08E176A7_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05783A1F_3AA3_A1D2_41A6_E88282E5373B_playlist, 2, 0)",
   "media": "this.panorama_A7B91B96_B438_EF49_41D0_EA4C08E176A7",
   "player": "this.MainViewerPanoramaPlayer"
  }
 ],
 "id": "DropDown_05783A1F_3AA3_A1D2_41A6_E88282E5373B_playlist"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -105.19,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_B4C0DA96_BB3F_656C_41B7_DE3605EF7133"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -9.35,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_B5C2B968_BB3F_67A4_4197_495FE216151A"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_95EBD687_B439_F94A_41D8_B3A956CC1C1A_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_7EA21DB9_7498_BFB7_41B6_6780B5D32237_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -122.29,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_ABFBCB84_BB3F_7B6C_41E4_9AC3C5FDB660"
},
{
 "class": "FadeInEffect",
 "duration": 1000,
 "id": "effect_7C166668_69B2_CE83_41C0_E996540EE3C0",
 "easing": "cubic_in_out"
},
{
 "class": "ImageResource",
 "id": "ImageResource_70A2408C_69F2_439F_41CC_E21F71A239B5",
 "levels": [
  {
   "url": "media/popup_7FC3EA5A_6992_46BA_41D1_DE698FE2B38C_0_0.jpg",
   "class": "ImageResourceLevel",
   "width": 1600,
   "height": 1131
  },
  {
   "url": "media/popup_7FC3EA5A_6992_46BA_41D1_DE698FE2B38C_0_1.jpg",
   "class": "ImageResourceLevel",
   "width": 1024,
   "height": 723
  },
  {
   "url": "media/popup_7FC3EA5A_6992_46BA_41D1_DE698FE2B38C_0_2.jpg",
   "class": "ImageResourceLevel",
   "width": 512,
   "height": 361
  }
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_97C448F2_B438_6ACB_41C4_33E793A0EAB5_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 89.43,
   "backwardYaw": -86.73,
   "distance": 1,
   "panorama": "this.panorama_7EA21DB9_7498_BFB7_41B6_6780B5D32237"
  }
 ],
 "hfov": 360,
 "id": "panorama_BB48DE80_B418_E949_41D5_AC51A1BC4CDE",
 "thumbnailUrl": "media/panorama_BB48DE80_B418_E949_41D5_AC51A1BC4CDE_t.jpg",
 "label": "Second Temple",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB48DE80_B418_E949_41D5_AC51A1BC4CDE_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_BB48DE80_B418_E949_41D5_AC51A1BC4CDE_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BB48DE80_B418_E949_41D5_AC51A1BC4CDE_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BB48DE80_B418_E949_41D5_AC51A1BC4CDE_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB48DE80_B418_E949_41D5_AC51A1BC4CDE_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_BB48DE80_B418_E949_41D5_AC51A1BC4CDE_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BB48DE80_B418_E949_41D5_AC51A1BC4CDE_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BB48DE80_B418_E949_41D5_AC51A1BC4CDE_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB48DE80_B418_E949_41D5_AC51A1BC4CDE_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_BB48DE80_B418_E949_41D5_AC51A1BC4CDE_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BB48DE80_B418_E949_41D5_AC51A1BC4CDE_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BB48DE80_B418_E949_41D5_AC51A1BC4CDE_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB48DE80_B418_E949_41D5_AC51A1BC4CDE_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_BB48DE80_B418_E949_41D5_AC51A1BC4CDE_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BB48DE80_B418_E949_41D5_AC51A1BC4CDE_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BB48DE80_B418_E949_41D5_AC51A1BC4CDE_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB48DE80_B418_E949_41D5_AC51A1BC4CDE_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_BB48DE80_B418_E949_41D5_AC51A1BC4CDE_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BB48DE80_B418_E949_41D5_AC51A1BC4CDE_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BB48DE80_B418_E949_41D5_AC51A1BC4CDE_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB48DE80_B418_E949_41D5_AC51A1BC4CDE_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_BB48DE80_B418_E949_41D5_AC51A1BC4CDE_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BB48DE80_B418_E949_41D5_AC51A1BC4CDE_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BB48DE80_B418_E949_41D5_AC51A1BC4CDE_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BB48DE80_B418_E949_41D5_AC51A1BC4CDE_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_A633131D_B468_5F7B_41E4_56E286BC695F"
 ]
},
{
 "class": "ImageResource",
 "id": "ImageResource_70B4308B_69F2_4399_41D5_0D0A7AB54601",
 "levels": [
  {
   "url": "media/popup_7C964E13_6993_DE8B_41CF_AEBF7D02752C_0_0.jpg",
   "class": "ImageResourceLevel",
   "width": 1600,
   "height": 1131
  },
  {
   "url": "media/popup_7C964E13_6993_DE8B_41CF_AEBF7D02752C_0_1.jpg",
   "class": "ImageResourceLevel",
   "width": 1024,
   "height": 723
  },
  {
   "url": "media/popup_7C964E13_6993_DE8B_41CF_AEBF7D02752C_0_2.jpg",
   "class": "ImageResourceLevel",
   "width": 512,
   "height": 361
  }
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -0.57,
   "backwardYaw": -85.64,
   "distance": 1,
   "panorama": "this.panorama_A7B91B96_B438_EF49_41D0_EA4C08E176A7"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 74.95,
   "backwardYaw": -98.46,
   "distance": 1,
   "panorama": "this.panorama_7EC7D790_7498_4C75_41CB_BD28A22679B2"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_7EA21DB9_7498_BFB7_41B6_6780B5D32237"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -91.6,
   "backwardYaw": 89.87,
   "distance": 1,
   "panorama": "this.panorama_7ECAB660_7498_4CD6_41D4_1A5A06463D23"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 152.79,
   "backwardYaw": 96.69,
   "distance": 1,
   "panorama": "this.panorama_BB48943D_B418_B9BB_41DE_BEF438B84FDE"
  }
 ],
 "hfov": 360,
 "id": "panorama_7EA21F0F_7498_5C6A_41D8_19929C3AC58B",
 "thumbnailUrl": "media/panorama_7EA21F0F_7498_5C6A_41D8_19929C3AC58B_t.jpg",
 "label": "Road To The Lake 5",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7EA21F0F_7498_5C6A_41D8_19929C3AC58B_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_7EA21F0F_7498_5C6A_41D8_19929C3AC58B_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_7EA21F0F_7498_5C6A_41D8_19929C3AC58B_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7EA21F0F_7498_5C6A_41D8_19929C3AC58B_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7EA21F0F_7498_5C6A_41D8_19929C3AC58B_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_7EA21F0F_7498_5C6A_41D8_19929C3AC58B_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_7EA21F0F_7498_5C6A_41D8_19929C3AC58B_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7EA21F0F_7498_5C6A_41D8_19929C3AC58B_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7EA21F0F_7498_5C6A_41D8_19929C3AC58B_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_7EA21F0F_7498_5C6A_41D8_19929C3AC58B_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_7EA21F0F_7498_5C6A_41D8_19929C3AC58B_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7EA21F0F_7498_5C6A_41D8_19929C3AC58B_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7EA21F0F_7498_5C6A_41D8_19929C3AC58B_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_7EA21F0F_7498_5C6A_41D8_19929C3AC58B_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_7EA21F0F_7498_5C6A_41D8_19929C3AC58B_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7EA21F0F_7498_5C6A_41D8_19929C3AC58B_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7EA21F0F_7498_5C6A_41D8_19929C3AC58B_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_7EA21F0F_7498_5C6A_41D8_19929C3AC58B_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_7EA21F0F_7498_5C6A_41D8_19929C3AC58B_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7EA21F0F_7498_5C6A_41D8_19929C3AC58B_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7EA21F0F_7498_5C6A_41D8_19929C3AC58B_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_7EA21F0F_7498_5C6A_41D8_19929C3AC58B_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_7EA21F0F_7498_5C6A_41D8_19929C3AC58B_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7EA21F0F_7498_5C6A_41D8_19929C3AC58B_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7EA21F0F_7498_5C6A_41D8_19929C3AC58B_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_7B1E082E_7498_44AD_41CC_7BC396F4824A",
  "this.overlay_B997430D_B41B_DF5A_41D1_DC45477503CA",
  "this.overlay_BB1CECB4_B43B_A94A_41D3_80630F48D91D",
  "this.overlay_C8F64ED7_DE76_DC9B_41CE_1B11F95B13CC"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_A78285F6_B43F_DAC9_41D5_DC8F7DA52DC0_camera"
},
{
 "rotationY": 0,
 "class": "PopupPanoramaOverlay",
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 5.32,
 "id": "popup_7D4732AE_6992_479A_41D8_34FF02FF2036",
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_7D4732AE_6992_479A_41D8_34FF02FF2036_0_1.jpg",
    "class": "ImageResourceLevel",
    "width": 1024,
    "height": 723
   }
  ]
 },
 "pitch": 1.64,
 "yaw": -80.02,
 "hideDuration": 500,
 "popupDistance": 100
},
{
 "class": "ImageResource",
 "id": "ImageResource_70AEB098_69F2_4387_41D6_08157727882C",
 "levels": [
  {
   "url": "media/popup_7CF23DAF_6992_5D9C_41CC_1C47C22202CD_0_0.jpg",
   "class": "ImageResourceLevel",
   "width": 1600,
   "height": 1131
  },
  {
   "url": "media/popup_7CF23DAF_6992_5D9C_41CC_1C47C22202CD_0_1.jpg",
   "class": "ImageResourceLevel",
   "width": 1024,
   "height": 723
  },
  {
   "url": "media/popup_7CF23DAF_6992_5D9C_41CC_1C47C22202CD_0_2.jpg",
   "class": "ImageResourceLevel",
   "width": 512,
   "height": 361
  }
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 68.36,
   "backwardYaw": -92.14,
   "distance": 1,
   "panorama": "this.panorama_7FD5281A_7498_4475_41D5_125CE4CC7753"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 177.51,
   "backwardYaw": -162.1,
   "distance": 1,
   "panorama": "this.panorama_BBB1C0DB_B418_7AFE_41E5_7573BE28445D"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -108.97,
   "backwardYaw": 81.45,
   "distance": 1,
   "panorama": "this.panorama_7EC7D790_7498_4C75_41CB_BD28A22679B2"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 64.38,
   "backwardYaw": -91.96,
   "distance": 1,
   "panorama": "this.panorama_A7B96437_B438_B9B7_41D3_8359BF07DA8B"
  }
 ],
 "hfov": 360,
 "id": "panorama_7EA62FDF_7498_7BEB_41B0_E9C030E0910C",
 "thumbnailUrl": "media/panorama_7EA62FDF_7498_7BEB_41B0_E9C030E0910C_t.jpg",
 "label": "Road To The Lake 3",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7EA62FDF_7498_7BEB_41B0_E9C030E0910C_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_7EA62FDF_7498_7BEB_41B0_E9C030E0910C_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_7EA62FDF_7498_7BEB_41B0_E9C030E0910C_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7EA62FDF_7498_7BEB_41B0_E9C030E0910C_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7EA62FDF_7498_7BEB_41B0_E9C030E0910C_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_7EA62FDF_7498_7BEB_41B0_E9C030E0910C_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_7EA62FDF_7498_7BEB_41B0_E9C030E0910C_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7EA62FDF_7498_7BEB_41B0_E9C030E0910C_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7EA62FDF_7498_7BEB_41B0_E9C030E0910C_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_7EA62FDF_7498_7BEB_41B0_E9C030E0910C_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_7EA62FDF_7498_7BEB_41B0_E9C030E0910C_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7EA62FDF_7498_7BEB_41B0_E9C030E0910C_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7EA62FDF_7498_7BEB_41B0_E9C030E0910C_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_7EA62FDF_7498_7BEB_41B0_E9C030E0910C_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_7EA62FDF_7498_7BEB_41B0_E9C030E0910C_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7EA62FDF_7498_7BEB_41B0_E9C030E0910C_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7EA62FDF_7498_7BEB_41B0_E9C030E0910C_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_7EA62FDF_7498_7BEB_41B0_E9C030E0910C_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_7EA62FDF_7498_7BEB_41B0_E9C030E0910C_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7EA62FDF_7498_7BEB_41B0_E9C030E0910C_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7EA62FDF_7498_7BEB_41B0_E9C030E0910C_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_7EA62FDF_7498_7BEB_41B0_E9C030E0910C_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_7EA62FDF_7498_7BEB_41B0_E9C030E0910C_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7EA62FDF_7498_7BEB_41B0_E9C030E0910C_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7EA62FDF_7498_7BEB_41B0_E9C030E0910C_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_7A369C90_749B_BC75_41C1_1C3D433F0AAC",
  "this.overlay_7A2BC80D_7498_446E_41C1_A13EEEBDD74C",
  "this.overlay_A3795A44_B428_E9C9_41E1_079ACF473537",
  "this.overlay_97150702_B428_674B_41E1_35E93DC76B75"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -90.57,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_B43759C1_BB3F_66E4_41E1_407277F72169"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_7FD5281A_7498_4475_41D5_125CE4CC7753_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -170.15,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_B47CE9FC_BB3F_669C_4183_BB36C1575E75"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 81.77,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_B57C7893_BB3F_6564_4198_05EDE4C3CC9E"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -93.91,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_AAAE9829_BB3F_65A4_41E0_5BB1C4EC666D"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 94.36,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_AB70CB28_BB3F_7BA4_41E4_48105200FA1A"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_BB48943D_B418_B9BB_41DE_BEF438B84FDE_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 93.08,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_B4E43AC7_BB3F_7AEC_41E4_A0F6359FF180"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -15.49,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_ABD96B70_BB3F_7BA4_41E4_FA3B73D46D26"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 1.9,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_B59918F5_BB3F_66AC_41DA_16F5544FD25D"
},
{
 "class": "ImageResource",
 "id": "ImageResource_70AC8098_69F2_4387_41CE_0CF0BF9CCE65",
 "levels": [
  {
   "url": "media/popup_7F1D2678_6996_4E86_41D4_B394CB6B5C99_0_0.jpg",
   "class": "ImageResourceLevel",
   "width": 1600,
   "height": 1131
  },
  {
   "url": "media/popup_7F1D2678_6996_4E86_41D4_B394CB6B5C99_0_1.jpg",
   "class": "ImageResourceLevel",
   "width": 1024,
   "height": 723
  },
  {
   "url": "media/popup_7F1D2678_6996_4E86_41D4_B394CB6B5C99_0_2.jpg",
   "class": "ImageResourceLevel",
   "width": 512,
   "height": 361
  }
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -168.41,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_B5CF995D_BB3F_679C_41B2_DD18FBDD393B"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -105.05,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_B488EA29_BB3F_65A4_41C8_6A943BE2C168"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -33.8,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_AB171AD8_BB3F_7AE4_41E2_B9F388CA9363"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 159.86,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_B45EA9D8_BB3F_66E4_41DF_851F9A0F56DC"
},
{
 "hfovMax": 130,
 "class": "Panorama",
 "partial": false,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_97C448F2_B438_6ACB_41C4_33E793A0EAB5_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_97C448F2_B438_6ACB_41C4_33E793A0EAB5_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_97C448F2_B438_6ACB_41C4_33E793A0EAB5_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_97C448F2_B438_6ACB_41C4_33E793A0EAB5_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_97C448F2_B438_6ACB_41C4_33E793A0EAB5_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_97C448F2_B438_6ACB_41C4_33E793A0EAB5_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_97C448F2_B438_6ACB_41C4_33E793A0EAB5_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_97C448F2_B438_6ACB_41C4_33E793A0EAB5_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_97C448F2_B438_6ACB_41C4_33E793A0EAB5_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_97C448F2_B438_6ACB_41C4_33E793A0EAB5_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_97C448F2_B438_6ACB_41C4_33E793A0EAB5_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_97C448F2_B438_6ACB_41C4_33E793A0EAB5_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_97C448F2_B438_6ACB_41C4_33E793A0EAB5_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_97C448F2_B438_6ACB_41C4_33E793A0EAB5_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_97C448F2_B438_6ACB_41C4_33E793A0EAB5_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_97C448F2_B438_6ACB_41C4_33E793A0EAB5_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_97C448F2_B438_6ACB_41C4_33E793A0EAB5_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_97C448F2_B438_6ACB_41C4_33E793A0EAB5_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_97C448F2_B438_6ACB_41C4_33E793A0EAB5_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_97C448F2_B438_6ACB_41C4_33E793A0EAB5_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_97C448F2_B438_6ACB_41C4_33E793A0EAB5_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_97C448F2_B438_6ACB_41C4_33E793A0EAB5_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_97C448F2_B438_6ACB_41C4_33E793A0EAB5_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_97C448F2_B438_6ACB_41C4_33E793A0EAB5_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_97C448F2_B438_6ACB_41C4_33E793A0EAB5_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "Camping Area Drone",
 "id": "panorama_97C448F2_B438_6ACB_41C4_33E793A0EAB5",
 "thumbnailUrl": "media/panorama_97C448F2_B438_6ACB_41C4_33E793A0EAB5_t.jpg",
 "hfovMin": "120%",
 "pitch": 0
},
{
 "class": "FadeInEffect",
 "duration": 1000,
 "id": "effect_7C16F668_69B2_CE83_41D6_58CA337093FE",
 "easing": "cubic_in_out"
},
{
 "class": "FadeOutEffect",
 "duration": 1000,
 "id": "effect_7C167668_69B2_CE83_41CE_5D98DDCE0010",
 "easing": "cubic_in_out"
},
{
 "class": "ImageResource",
 "id": "ImageResource_70A74095_69F2_4389_41D2_F0D030EE7B7D",
 "levels": [
  {
   "url": "media/popup_7C0E8F0F_69F2_5E99_41B1_4AB4B4132415_0_0.jpg",
   "class": "ImageResourceLevel",
   "width": 1600,
   "height": 1131
  },
  {
   "url": "media/popup_7C0E8F0F_69F2_5E99_41B1_4AB4B4132415_0_1.jpg",
   "class": "ImageResourceLevel",
   "width": 1024,
   "height": 723
  },
  {
   "url": "media/popup_7C0E8F0F_69F2_5E99_41B1_4AB4B4132415_0_2.jpg",
   "class": "ImageResourceLevel",
   "width": 512,
   "height": 361
  }
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A7808C0B_B43F_A958_41AE_36DF5B301090"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -105.08,
   "backwardYaw": 36.07,
   "distance": 1,
   "panorama": "this.panorama_A7B90CA2_B438_6949_41D9_FECD4F9980FC"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 164.51,
   "backwardYaw": 9.85,
   "distance": 1,
   "panorama": "this.panorama_A786980F_B438_A958_41CC_E1CD8D96840B"
  }
 ],
 "hfov": 360,
 "id": "panorama_A7BEF0A3_B43F_B94F_41B9_9975BB394A37",
 "thumbnailUrl": "media/panorama_A7BEF0A3_B43F_B94F_41B9_9975BB394A37_t.jpg",
 "label": "Camping Area 4",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7BEF0A3_B43F_B94F_41B9_9975BB394A37_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A7BEF0A3_B43F_B94F_41B9_9975BB394A37_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A7BEF0A3_B43F_B94F_41B9_9975BB394A37_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A7BEF0A3_B43F_B94F_41B9_9975BB394A37_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7BEF0A3_B43F_B94F_41B9_9975BB394A37_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A7BEF0A3_B43F_B94F_41B9_9975BB394A37_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A7BEF0A3_B43F_B94F_41B9_9975BB394A37_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A7BEF0A3_B43F_B94F_41B9_9975BB394A37_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7BEF0A3_B43F_B94F_41B9_9975BB394A37_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A7BEF0A3_B43F_B94F_41B9_9975BB394A37_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A7BEF0A3_B43F_B94F_41B9_9975BB394A37_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A7BEF0A3_B43F_B94F_41B9_9975BB394A37_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7BEF0A3_B43F_B94F_41B9_9975BB394A37_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A7BEF0A3_B43F_B94F_41B9_9975BB394A37_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A7BEF0A3_B43F_B94F_41B9_9975BB394A37_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A7BEF0A3_B43F_B94F_41B9_9975BB394A37_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7BEF0A3_B43F_B94F_41B9_9975BB394A37_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A7BEF0A3_B43F_B94F_41B9_9975BB394A37_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A7BEF0A3_B43F_B94F_41B9_9975BB394A37_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A7BEF0A3_B43F_B94F_41B9_9975BB394A37_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7BEF0A3_B43F_B94F_41B9_9975BB394A37_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A7BEF0A3_B43F_B94F_41B9_9975BB394A37_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A7BEF0A3_B43F_B94F_41B9_9975BB394A37_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A7BEF0A3_B43F_B94F_41B9_9975BB394A37_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A7BEF0A3_B43F_B94F_41B9_9975BB394A37_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_AB716A74_B419_E9CF_41C5_F49DB09F398C",
  "this.overlay_7C64B772_6992_CE8A_41C1_74F633432A88",
  "this.popup_7FC3EA5A_6992_46BA_41D1_DE698FE2B38C",
  "this.overlay_7C148844_69F6_C288_41CE_4D92A68BF945",
  "this.overlay_7116566E_6997_CE96_41D9_42AD45BF6ACB"
 ]
},
{
 "class": "PlayList",
 "items": [
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_97C448F2_B438_6ACB_41C4_33E793A0EAB5_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_0561BA16_3AA3_A1D2_41C7_FDA0B6E9EE29_playlist, 0, 1)",
   "media": "this.panorama_97C448F2_B438_6ACB_41C4_33E793A0EAB5",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_95CD3E53_B439_A9C9_41BB_810EAA1DFE58_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_0561BA16_3AA3_A1D2_41C7_FDA0B6E9EE29_playlist, 1, 2)",
   "media": "this.panorama_95CD3E53_B439_A9C9_41BB_810EAA1DFE58",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_95EBABAF_B439_AF59_41E0_DD8AB662F458_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_0561BA16_3AA3_A1D2_41C7_FDA0B6E9EE29_playlist, 2, 3)",
   "media": "this.panorama_95EBABAF_B439_AF59_41E0_DD8AB662F458",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_95C2995D_B439_EBFE_41E4_BB7C848E21F6_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_0561BA16_3AA3_A1D2_41C7_FDA0B6E9EE29_playlist, 3, 4)",
   "media": "this.panorama_95C2995D_B439_EBFE_41E4_BB7C848E21F6",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_95EBD687_B439_F94A_41D8_B3A956CC1C1A_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_0561BA16_3AA3_A1D2_41C7_FDA0B6E9EE29_playlist, 4, 5)",
   "media": "this.panorama_95EBD687_B439_F94A_41D8_B3A956CC1C1A",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_95C99373_B439_DFC9_41CF_DBA77EFE762A_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_0561BA16_3AA3_A1D2_41C7_FDA0B6E9EE29_playlist, 5, 0)",
   "media": "this.panorama_95C99373_B439_DFC9_41CF_DBA77EFE762A",
   "player": "this.MainViewerPanoramaPlayer"
  }
 ],
 "id": "DropDown_0561BA16_3AA3_A1D2_41C7_FDA0B6E9EE29_playlist"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_A78661E2_B438_7AC9_41D6_BADE776856B8_camera"
},
{
 "rotationY": 0,
 "class": "PopupPanoramaOverlay",
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 5.32,
 "id": "popup_7F3248F5_6993_C38E_41D3_4522D27990C6",
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_7F3248F5_6993_C38E_41D3_4522D27990C6_0_1.jpg",
    "class": "ImageResourceLevel",
    "width": 1024,
    "height": 723
   }
  ]
 },
 "pitch": -1.56,
 "yaw": 51.09,
 "hideDuration": 500,
 "popupDistance": 100
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 74.81,
   "backwardYaw": -178.1,
   "distance": 1,
   "panorama": "this.panorama_A7808C0B_B43F_A958_41AE_36DF5B301090"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -98.23,
   "backwardYaw": 94.1,
   "distance": 1,
   "panorama": "this.panorama_A7B91B96_B438_EF49_41D0_EA4C08E176A7"
  }
 ],
 "hfov": 360,
 "id": "panorama_A7924FCC_B438_A6D8_41E4_F69093B7B763",
 "thumbnailUrl": "media/panorama_A7924FCC_B438_A6D8_41E4_F69093B7B763_t.jpg",
 "label": "Temple 2",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7924FCC_B438_A6D8_41E4_F69093B7B763_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A7924FCC_B438_A6D8_41E4_F69093B7B763_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A7924FCC_B438_A6D8_41E4_F69093B7B763_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A7924FCC_B438_A6D8_41E4_F69093B7B763_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7924FCC_B438_A6D8_41E4_F69093B7B763_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A7924FCC_B438_A6D8_41E4_F69093B7B763_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A7924FCC_B438_A6D8_41E4_F69093B7B763_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A7924FCC_B438_A6D8_41E4_F69093B7B763_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7924FCC_B438_A6D8_41E4_F69093B7B763_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A7924FCC_B438_A6D8_41E4_F69093B7B763_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A7924FCC_B438_A6D8_41E4_F69093B7B763_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A7924FCC_B438_A6D8_41E4_F69093B7B763_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7924FCC_B438_A6D8_41E4_F69093B7B763_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A7924FCC_B438_A6D8_41E4_F69093B7B763_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A7924FCC_B438_A6D8_41E4_F69093B7B763_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A7924FCC_B438_A6D8_41E4_F69093B7B763_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7924FCC_B438_A6D8_41E4_F69093B7B763_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A7924FCC_B438_A6D8_41E4_F69093B7B763_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A7924FCC_B438_A6D8_41E4_F69093B7B763_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A7924FCC_B438_A6D8_41E4_F69093B7B763_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7924FCC_B438_A6D8_41E4_F69093B7B763_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A7924FCC_B438_A6D8_41E4_F69093B7B763_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A7924FCC_B438_A6D8_41E4_F69093B7B763_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A7924FCC_B438_A6D8_41E4_F69093B7B763_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A7924FCC_B438_A6D8_41E4_F69093B7B763_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_AE254CEB_B418_6ADF_41E3_B6ACC297C527",
  "this.overlay_AE2ED2D7_B418_7EC8_41DE_A0E8B1CF4F06",
  "this.overlay_7C5B85AA_6993_CD9A_41D6_C8AF84B9B365",
  "this.popup_7F3248F5_6993_C38E_41D3_4522D27990C6"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -143.93,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_B448C9F1_BB3F_66A4_4197_70D2807B5C90"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 9.85,
   "backwardYaw": 164.51,
   "distance": 1,
   "panorama": "this.panorama_A7BEF0A3_B43F_B94F_41B9_9975BB394A37"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -86.92,
   "backwardYaw": 112.27,
   "distance": 1,
   "panorama": "this.panorama_A7808C0B_B43F_A958_41AE_36DF5B301090"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -50.47,
   "backwardYaw": 57.71,
   "distance": 1,
   "panorama": "this.panorama_A7B90CA2_B438_6949_41D9_FECD4F9980FC"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 108.88,
   "backwardYaw": -58.69,
   "distance": 1,
   "panorama": "this.panorama_A7B936D4_B438_66C8_41D7_BBFCC5890205"
  }
 ],
 "hfov": 360,
 "id": "panorama_A786980F_B438_A958_41CC_E1CD8D96840B",
 "thumbnailUrl": "media/panorama_A786980F_B438_A958_41CC_E1CD8D96840B_t.jpg",
 "label": "Road To The Camping Area",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A786980F_B438_A958_41CC_E1CD8D96840B_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A786980F_B438_A958_41CC_E1CD8D96840B_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A786980F_B438_A958_41CC_E1CD8D96840B_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A786980F_B438_A958_41CC_E1CD8D96840B_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A786980F_B438_A958_41CC_E1CD8D96840B_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A786980F_B438_A958_41CC_E1CD8D96840B_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A786980F_B438_A958_41CC_E1CD8D96840B_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A786980F_B438_A958_41CC_E1CD8D96840B_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A786980F_B438_A958_41CC_E1CD8D96840B_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A786980F_B438_A958_41CC_E1CD8D96840B_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A786980F_B438_A958_41CC_E1CD8D96840B_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A786980F_B438_A958_41CC_E1CD8D96840B_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A786980F_B438_A958_41CC_E1CD8D96840B_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A786980F_B438_A958_41CC_E1CD8D96840B_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A786980F_B438_A958_41CC_E1CD8D96840B_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A786980F_B438_A958_41CC_E1CD8D96840B_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A786980F_B438_A958_41CC_E1CD8D96840B_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A786980F_B438_A958_41CC_E1CD8D96840B_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A786980F_B438_A958_41CC_E1CD8D96840B_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A786980F_B438_A958_41CC_E1CD8D96840B_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A786980F_B438_A958_41CC_E1CD8D96840B_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A786980F_B438_A958_41CC_E1CD8D96840B_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A786980F_B438_A958_41CC_E1CD8D96840B_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A786980F_B438_A958_41CC_E1CD8D96840B_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A786980F_B438_A958_41CC_E1CD8D96840B_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_A2DA6072_B428_B9C9_41B6_D11839B44198",
  "this.overlay_A35C1410_B4EB_D948_41E6_18C6F4DAC824",
  "this.overlay_ACCA3952_B4EF_ABC8_41D4_26338191B273",
  "this.overlay_7C003304_698D_C68E_41B8_404F6ED61E29",
  "this.popup_7C97490D_698E_4299_41D9_6E94BBE9B2BB",
  "this.overlay_7C3BDA25_698D_C68B_41D3_17A48B868E55"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_A7B96437_B438_B9B7_41D3_8359BF07DA8B_camera"
},
{
 "class": "PlayList",
 "items": [
  {
   "class": "PanoramaPlayListItem",
   "end": "this.setComponentVisibility(this.Image_7AC4751F_69BE_42BD_41D7_1E8A64921786, false, -1, this.effect_7C16D668_69B2_CE83_41B8_40EC1A4EDC42, 'hideEffect', false)",
   "camera": "this.panorama_7FD5281A_7498_4475_41D5_125CE4CC7753_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_057BFA20_3AA3_A1EE_41A9_8EE569D894A7_playlist, 0, 1); this.keepComponentVisibility(this.Image_7AC4751F_69BE_42BD_41D7_1E8A64921786, false); this.setComponentVisibility(this.Image_7AC4751F_69BE_42BD_41D7_1E8A64921786, true, -1, this.effect_7C16F668_69B2_CE83_41D6_58CA337093FE, 'showEffect', false)",
   "media": "this.panorama_7FD5281A_7498_4475_41D5_125CE4CC7753",
   "player": "this.MainViewerPanoramaPlayer",
   "start": "this.keepComponentVisibility(this.Image_7AC4751F_69BE_42BD_41D7_1E8A64921786, true)"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A7B96437_B438_B9B7_41D3_8359BF07DA8B_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_057BFA20_3AA3_A1EE_41A9_8EE569D894A7_playlist, 1, 2)",
   "media": "this.panorama_A7B96437_B438_B9B7_41D3_8359BF07DA8B",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "end": "this.setComponentVisibility(this.Image_7AC4751F_69BE_42BD_41D7_1E8A64921786, false, -1, this.effect_7C167668_69B2_CE83_41CE_5D98DDCE0010, 'hideEffect', false)",
   "camera": "this.panorama_7EA62FDF_7498_7BEB_41B0_E9C030E0910C_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_057BFA20_3AA3_A1EE_41A9_8EE569D894A7_playlist, 2, 3); this.keepComponentVisibility(this.Image_7AC4751F_69BE_42BD_41D7_1E8A64921786, false); this.setComponentVisibility(this.Image_7AC4751F_69BE_42BD_41D7_1E8A64921786, true, -1, this.effect_7C166668_69B2_CE83_41C0_E996540EE3C0, 'showEffect', false)",
   "media": "this.panorama_7EA62FDF_7498_7BEB_41B0_E9C030E0910C",
   "player": "this.MainViewerPanoramaPlayer",
   "start": "this.keepComponentVisibility(this.Image_7AC4751F_69BE_42BD_41D7_1E8A64921786, true)"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_7EC7D790_7498_4C75_41CB_BD28A22679B2_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_057BFA20_3AA3_A1EE_41A9_8EE569D894A7_playlist, 3, 4)",
   "media": "this.panorama_7EC7D790_7498_4C75_41CB_BD28A22679B2",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_7EA21F0F_7498_5C6A_41D8_19929C3AC58B_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_057BFA20_3AA3_A1EE_41A9_8EE569D894A7_playlist, 4, 5)",
   "media": "this.panorama_7EA21F0F_7498_5C6A_41D8_19929C3AC58B",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_7ECAB660_7498_4CD6_41D4_1A5A06463D23_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_057BFA20_3AA3_A1EE_41A9_8EE569D894A7_playlist, 5, 0)",
   "media": "this.panorama_7ECAB660_7498_4CD6_41D4_1A5A06463D23",
   "player": "this.MainViewerPanoramaPlayer"
  }
 ],
 "id": "DropDown_057BFA20_3AA3_A1EE_41A9_8EE569D894A7_playlist"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_BBA93A6D_B418_A9DA_41DF_BE4E0F1A548B_camera"
},
{
 "rotationY": 0,
 "class": "PopupPanoramaOverlay",
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 5.32,
 "id": "popup_7C0E8F0F_69F2_5E99_41B1_4AB4B4132415",
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_7C0E8F0F_69F2_5E99_41B1_4AB4B4132415_0_1.jpg",
    "class": "ImageResourceLevel",
    "width": 1024,
    "height": 723
   }
  ]
 },
 "pitch": 1.07,
 "yaw": -96.22,
 "hideDuration": 500,
 "popupDistance": 100
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_A7808C0B_B43F_A958_41AE_36DF5B301090_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_7EA21F0F_7498_5C6A_41D8_19929C3AC58B_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -115.62,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_B4AC6A4F_BB3F_65FC_41E0_3841C909F1B1"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -27.21,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_AB4F5B11_BB3F_7B64_41DE_0647A40926EA"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 101.09,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_B465FA13_BB3F_6564_41E1_8DB4575A7D85"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -81.22,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_B5EF397E_BB3F_679C_41D1_FB43C0EDA64D"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -162.1,
   "backwardYaw": 177.51,
   "distance": 1,
   "panorama": "this.panorama_7EA62FDF_7498_7BEB_41B0_E9C030E0910C"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 98.78,
   "backwardYaw": -78.91,
   "distance": 1,
   "panorama": "this.panorama_BBA93A6D_B418_A9DA_41DF_BE4E0F1A548B"
  }
 ],
 "hfov": 360,
 "id": "panorama_BBB1C0DB_B418_7AFE_41E5_7573BE28445D",
 "thumbnailUrl": "media/panorama_BBB1C0DB_B418_7AFE_41E5_7573BE28445D_t.jpg",
 "label": "Toilet",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BBB1C0DB_B418_7AFE_41E5_7573BE28445D_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_BBB1C0DB_B418_7AFE_41E5_7573BE28445D_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BBB1C0DB_B418_7AFE_41E5_7573BE28445D_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BBB1C0DB_B418_7AFE_41E5_7573BE28445D_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BBB1C0DB_B418_7AFE_41E5_7573BE28445D_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_BBB1C0DB_B418_7AFE_41E5_7573BE28445D_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BBB1C0DB_B418_7AFE_41E5_7573BE28445D_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BBB1C0DB_B418_7AFE_41E5_7573BE28445D_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BBB1C0DB_B418_7AFE_41E5_7573BE28445D_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_BBB1C0DB_B418_7AFE_41E5_7573BE28445D_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BBB1C0DB_B418_7AFE_41E5_7573BE28445D_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BBB1C0DB_B418_7AFE_41E5_7573BE28445D_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BBB1C0DB_B418_7AFE_41E5_7573BE28445D_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_BBB1C0DB_B418_7AFE_41E5_7573BE28445D_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BBB1C0DB_B418_7AFE_41E5_7573BE28445D_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BBB1C0DB_B418_7AFE_41E5_7573BE28445D_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BBB1C0DB_B418_7AFE_41E5_7573BE28445D_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_BBB1C0DB_B418_7AFE_41E5_7573BE28445D_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BBB1C0DB_B418_7AFE_41E5_7573BE28445D_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BBB1C0DB_B418_7AFE_41E5_7573BE28445D_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BBB1C0DB_B418_7AFE_41E5_7573BE28445D_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_BBB1C0DB_B418_7AFE_41E5_7573BE28445D_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BBB1C0DB_B418_7AFE_41E5_7573BE28445D_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BBB1C0DB_B418_7AFE_41E5_7573BE28445D_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BBB1C0DB_B418_7AFE_41E5_7573BE28445D_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_A68EC876_B478_A9C9_41E2_BAE7E67D3156",
  "this.overlay_A37D6B06_B428_6F49_41C5_93A7BD353206"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_95EBABAF_B439_AF59_41E0_DD8AB662F458_camera"
},
{
 "transitionDuration": 500,
 "data": {
  "name": "Main Viewer"
 },
 "progressBackgroundColorDirection": "vertical",
 "id": "MainViewer",
 "left": 0,
 "playbackBarBottom": 5,
 "toolTipShadowSpread": 0,
 "progressBorderColor": "#FFFFFF",
 "toolTipBorderColor": "#F7931E",
 "paddingLeft": 0,
 "width": "100%",
 "playbackBarHeadOpacity": 1,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBarBackgroundColorRatios": [
  0
 ],
 "minWidth": 100,
 "toolTipOpacity": 1,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": "13px",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#F7931E",
 "playbackBarRight": 0,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 7,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "height": "100%",
 "shadow": false,
 "toolTipShadowColor": "#F7931E",
 "playbackBarBorderRadius": 0,
 "class": "ViewerArea",
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarHeadBorderColor": "#000000",
 "minHeight": 50,
 "toolTipShadowOpacity": 0,
 "progressLeft": 0,
 "paddingRight": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "playbackBarProgressBorderColor": "#000000",
 "propagateClick": true,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Georgia",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 0,
 "toolTipBackgroundColor": "#F7931E",
 "toolTipFontColor": "#F7931E",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "top": 0,
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowHorizontalLength": 0,
 "displayTooltipInTouchScreens": true,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "paddingBottom": 0,
 "toolTipPaddingLeft": 10,
 "progressBorderRadius": 0,
 "toolTipPaddingTop": 7,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "toolTipPaddingRight": 10,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "paddingTop": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "playbackBarHeadShadowVerticalLength": 0,
 "progressBarBorderColor": "#0066FF",
 "playbackBarHeadHeight": 15
},
{
 "layout": "absolute",
 "backgroundColorRatios": [
  0
 ],
 "scrollBarWidth": 10,
 "id": "Container_1B9AAD00_16C4_0505_41B5_6F4AE0747E48",
 "left": "0%",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "right": "0%",
 "children": [
  "this.Label_0E9CEE5D_36F3_E64E_419C_5A94FA5D3CA1",
  "this.Container_0542AAAA_3AA3_A6F3_41B2_0E208ADBBBE1"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "minWidth": 1,
 "backgroundColorDirection": "vertical",
 "top": 0,
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "backgroundColor": [
  "#F7931E"
 ],
 "verticalAlign": "top",
 "height": 60,
 "shadow": false,
 "gap": 10,
 "paddingTop": 0,
 "class": "Container",
 "paddingRight": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "backgroundOpacity": 1,
 "paddingBottom": 0,
 "overflow": "visible",
 "horizontalAlign": "left",
 "data": {
  "name": "--BUTTON SET"
 }
},
{
 "layout": "vertical",
 "backgroundColorRatios": [
  0.02
 ],
 "scrollBarWidth": 10,
 "id": "Container_0A760F11_3BA1_BFAE_41CD_32268FCAF8B4",
 "propagateClick": false,
 "width": 60,
 "scrollBarColor": "#000000",
 "right": 15,
 "children": [
  "this.Button_4D1C404A_5A87_C3B6_41BC_63B811C40CD0"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "minWidth": 1,
 "backgroundColorDirection": "vertical",
 "top": 62,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "backgroundColor": [
  "#F7931E"
 ],
 "verticalAlign": "middle",
 "height": 70.4,
 "scrollBarOpacity": 0.5,
 "shadow": false,
 "gap": 0,
 "paddingTop": 0,
 "class": "Container",
 "paddingRight": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "backgroundOpacity": 1,
 "paddingBottom": 0,
 "overflow": "scroll",
 "horizontalAlign": "center",
 "data": {
  "name": "-button set"
 }
},
{
 "layout": "horizontal",
 "propagateClick": true,
 "scrollBarWidth": 10,
 "id": "Container_1B99BD00_16C4_0505_41A4_A3C2452B0288",
 "scrollBarColor": "#000000",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.IconButton_7B212C50_3AA0_A1AF_41C5_F659ED22BD52",
  "this.IconButton_7B21CC51_3AA0_A251_41C9_1ABF5F74EDA0",
  "this.IconButton_797479D2_699F_C583_418F_562CA9204732"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "minWidth": 1,
 "width": "14.364%",
 "bottom": "0%",
 "contentOpaque": false,
 "verticalAlign": "middle",
 "height": 90,
 "scrollBarMargin": 2,
 "shadow": false,
 "gap": 3,
 "paddingTop": 0,
 "class": "Container",
 "minHeight": 1,
 "borderRadius": 0,
 "backgroundOpacity": 0,
 "paddingBottom": 0,
 "overflow": "scroll",
 "horizontalAlign": "right",
 "paddingRight": 30,
 "data": {
  "name": "-button set container"
 }
},
{
 "propagateClick": false,
 "id": "Image_7AC4751F_69BE_42BD_41D7_1E8A64921786",
 "left": "6.51%",
 "paddingLeft": 0,
 "width": "30.157%",
 "maxWidth": 1302,
 "minWidth": 1,
 "borderSize": 0,
 "url": "skin/Image_7AC4751F_69BE_42BD_41D7_1E8A64921786.jpg",
 "verticalAlign": "middle",
 "height": "38.929%",
 "top": "14.47%",
 "shadow": false,
 "maxHeight": 921,
 "class": "Image",
 "paddingTop": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "visible": false,
 "backgroundOpacity": 0,
 "scaleMode": "fit_inside",
 "paddingBottom": 0,
 "horizontalAlign": "center",
 "paddingRight": 0,
 "data": {
  "name": "Welcome"
 }
},
{
 "backgroundColorRatios": [
  0
 ],
 "id": "veilPopupPanorama",
 "left": 0,
 "propagateClick": false,
 "right": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "minWidth": 0,
 "backgroundColorDirection": "vertical",
 "top": 0,
 "showEffect": {
  "class": "FadeInEffect",
  "easing": "cubic_in_out",
  "duration": 350
 },
 "bottom": 0,
 "backgroundColor": [
  "#000000"
 ],
 "shadow": false,
 "class": "UIComponent",
 "paddingTop": 0,
 "minHeight": 0,
 "borderRadius": 0,
 "visible": false,
 "backgroundOpacity": 0.55,
 "paddingBottom": 0,
 "paddingRight": 0,
 "data": {
  "name": "UIComponent2834"
 }
},
{
 "backgroundColorRatios": [],
 "id": "zoomImagePopupPanorama",
 "left": 0,
 "propagateClick": false,
 "right": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "minWidth": 0,
 "backgroundColorDirection": "vertical",
 "top": 0,
 "bottom": 0,
 "backgroundColor": [],
 "shadow": false,
 "class": "ZoomImage",
 "paddingTop": 0,
 "minHeight": 0,
 "borderRadius": 0,
 "visible": false,
 "backgroundOpacity": 1,
 "scaleMode": "custom",
 "paddingBottom": 0,
 "paddingRight": 0,
 "data": {
  "name": "ZoomImage2835"
 }
},
{
 "textDecoration": "none",
 "layout": "horizontal",
 "horizontalAlign": "center",
 "backgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "data": {
  "name": "CloseButton2836"
 },
 "id": "closeButtonPopupPanorama",
 "rollOverIconColor": "#666666",
 "propagateClick": false,
 "shadowColor": "#000000",
 "fontFamily": "Arial",
 "right": 10,
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "borderSize": 0,
 "paddingLeft": 5,
 "minWidth": 0,
 "iconHeight": 20,
 "backgroundColorDirection": "vertical",
 "shadowSpread": 1,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "top": 10,
 "showEffect": {
  "class": "FadeInEffect",
  "easing": "cubic_in_out",
  "duration": 350
 },
 "iconColor": "#000000",
 "iconLineWidth": 5,
 "mode": "push",
 "backgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "fontSize": "1.29vmin",
 "label": "",
 "shadowBlurRadius": 6,
 "shadow": false,
 "gap": 5,
 "fontStyle": "normal",
 "pressedIconColor": "#888888",
 "class": "CloseButton",
 "paddingTop": 5,
 "minHeight": 0,
 "borderRadius": 0,
 "visible": false,
 "backgroundOpacity": 0.3,
 "paddingBottom": 5,
 "iconWidth": 20,
 "cursor": "hand",
 "paddingRight": 5,
 "fontWeight": "normal"
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7EA21F0F_7498_5C6A_41D8_19929C3AC58B, this.camera_AB4F5B11_BB3F_7B64_41DE_0647A40926EA); this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.39,
   "image": "this.AnimatedImageResource_A365E78D_B478_E75B_41E5_E44E5D9F7736",
   "pitch": -8.82,
   "yaw": 96.69,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A5D631FB_B46B_DABF_41D3_C376D47D1546",
 "maps": [
  {
   "hfov": 3.39,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 96.69,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB48943D_B418_B9BB_41DE_BEF438B84FDE_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -8.82
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7EA21DB9_7498_BFB7_41B6_6780B5D32237, this.camera_AB41EB1B_BB3F_7B64_41D2_A936CB66AB0F); this.mainPlayList.set('selectedIndex', 12)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.9,
   "image": "this.AnimatedImageResource_A365A78D_B478_E75B_41CF_375A2429FACA",
   "pitch": -6.66,
   "yaw": -83.38,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A58D7B87_B469_EF57_41DC_05F2598DD14D",
 "maps": [
  {
   "hfov": 3.9,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -83.38,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB48943D_B418_B9BB_41DE_BEF438B84FDE_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -6.66
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 9)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.57,
   "image": "this.AnimatedImageResource_A366778D_B478_E75B_41DC_1F26C6EEC35E",
   "pitch": -2.58,
   "yaw": -162.53,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A626CCAD_B468_695A_41DD_3E5EB8C408F5",
 "maps": [
  {
   "hfov": 1.57,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -162.53,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB48943D_B418_B9BB_41DE_BEF438B84FDE_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -2.58
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A0366EF2_B43F_E6C9_41D0_B451038B8996, this.camera_AA82A805_BB3F_656C_41E3_713FA46C7036); this.mainPlayList.set('selectedIndex', 17)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.56,
   "image": "this.AnimatedImageResource_97C86D68_B5E8_6BC7_41BC_BD9E10E16071",
   "pitch": -5.59,
   "yaw": 172.18,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_AA84D436_B428_B948_41A8_897870323BD5",
 "maps": [
  {
   "hfov": 2.56,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 172.18,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7BEAAF4_B43F_EEC9_41D7_7EF99E7900B7_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -5.59
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A78285F6_B43F_DAC9_41D5_DC8F7DA52DC0, this.camera_AA6257D7_BB3F_6AEC_41E1_CDCD27964FE7); this.mainPlayList.set('selectedIndex', 19)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.6,
   "image": "this.AnimatedImageResource_97C9CD68_B5E8_6BC7_41D3_B03BC8404A38",
   "pitch": -3.37,
   "yaw": -17.13,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_AA9BD86D_B417_E9D9_41E2_6A2104DF75BB",
 "maps": [
  {
   "hfov": 1.6,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -17.13,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7BEAAF4_B43F_EEC9_41D7_7EF99E7900B7_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -3.37
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A7808C0B_B43F_A958_41AE_36DF5B301090, this.camera_AA99C7E1_BB3F_6AA4_41E3_3CC08C24D617); this.mainPlayList.set('selectedIndex', 15)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.97,
   "image": "this.AnimatedImageResource_932FDA63_B418_69C9_41D7_1C17DF9EF292",
   "pitch": -3.35,
   "yaw": 136.91,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_9563AFEF_B418_66DA_41DF_9EE2A981D3BA",
 "maps": [
  {
   "hfov": 1.97,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 136.91,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7BEAAF4_B43F_EEC9_41D7_7EF99E7900B7_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -3.35
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showPopupPanoramaOverlay(this.popup_7C8727FE_6996_4D7A_41D9_7D0E3E50B5AB, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'paddingTop':5,'rollOverIconWidth':20,'pressedBorderSize':0,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingRight':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'paddingBottom':5,'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_70BD408C_69F2_439F_41C2_79E3939BEFB8, null, null, null, null, false)"
  }
 ],
 "data": {
  "label": "Info 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.32,
   "image": "this.AnimatedImageResource_716EF079_69F2_4379_41D8_92180A4B2B28",
   "pitch": 2.13,
   "yaw": -78.47,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_7FB6D8E5_6996_C389_41CF_A7A851E60D1E",
 "maps": [
  {
   "hfov": 5.32,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -78.47,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7BEAAF4_B43F_EEC9_41D7_7EF99E7900B7_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 2.13
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A7B90CA2_B438_6949_41D9_FECD4F9980FC, this.camera_AA8E67F1_BB3F_6AA4_41E2_73A5A7869D53); this.mainPlayList.set('selectedIndex', 16)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.25,
   "image": "this.AnimatedImageResource_7231C8E8_69B7_C39C_41B6_A2247AB154AA",
   "pitch": -2.83,
   "yaw": 93.73,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_74CD6038_69B6_42FB_41D7_B31330932CE2",
 "maps": [
  {
   "hfov": 2.25,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 93.73,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7BEAAF4_B43F_EEC9_41D7_7EF99E7900B7_0_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -2.83
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showPopupPanoramaOverlay(this.popup_7CF23DAF_6992_5D9C_41CC_1C47C22202CD, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'paddingTop':5,'rollOverIconWidth':20,'pressedBorderSize':0,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingRight':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'paddingBottom':5,'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_70AEB098_69F2_4387_41D6_08157727882C, null, null, null, null, false)"
  }
 ],
 "data": {
  "label": "Info 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.32,
   "image": "this.AnimatedImageResource_715BE07B_69F2_4379_41A0_BDF0E9717A95",
   "pitch": -8.85,
   "yaw": 12.57,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_7DE79FC7_6993_DD8B_41D5_706A8AEF9714",
 "maps": [
  {
   "hfov": 4.32,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 12.57,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_95C99373_B439_DFC9_41CF_DBA77EFE762A_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -8.85
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showPopupPanoramaOverlay(this.popup_7CE8CBE5_6992_C58F_41CF_69F433BB960C, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'paddingTop':5,'rollOverIconWidth':20,'pressedBorderSize':0,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingRight':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'paddingBottom':5,'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_70AD9098_69F2_4387_41CF_A445F18B4FB7, null, null, null, null, false)"
  }
 ],
 "data": {
  "label": "Info 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.63,
   "image": "this.AnimatedImageResource_715A707B_69F2_4379_41D2_C6E4FCA931ED",
   "pitch": -9.33,
   "yaw": -36.39,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_7D03690B_6992_C284_41D0_5788B6CF4BD3",
 "maps": [
  {
   "hfov": 3.63,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -36.39,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_95C99373_B439_DFC9_41CF_DBA77EFE762A_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -9.33
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showPopupPanoramaOverlay(this.popup_7F1D2678_6996_4E86_41D4_B394CB6B5C99, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'paddingTop':5,'rollOverIconWidth':20,'pressedBorderSize':0,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingRight':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'paddingBottom':5,'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_70AC8098_69F2_4387_41CE_0CF0BF9CCE65, null, null, null, null, false)"
  }
 ],
 "data": {
  "label": "Info 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.05,
   "image": "this.AnimatedImageResource_715A107B_69F2_4379_41D8_0CDF87F87B53",
   "pitch": 1.81,
   "yaw": -168.75,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_7C6749C0_6995_C586_41C3_FDBE763A1727",
 "maps": [
  {
   "hfov": 5.05,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -168.75,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_95C99373_B439_DFC9_41CF_DBA77EFE762A_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 1.81
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BBA93A6D_B418_A9DA_41DF_BE4E0F1A548B, this.camera_B4CE4A80_BB3F_6564_41E4_C45D5B596C07); this.mainPlayList.set('selectedIndex', 9)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.96,
   "image": "this.AnimatedImageResource_A7B877BE_B428_A6B9_41CC_9CDE64AFC056",
   "pitch": -8.38,
   "yaw": 170.65,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A0A91044_B429_F9C9_41BC_7E7928669554",
 "maps": [
  {
   "hfov": 4.96,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 170.65,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BBB08BDF_B418_EEF6_41B4_912FC2FCEF8E_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -8.38
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BBA93A6D_B418_A9DA_41DF_BE4E0F1A548B, this.camera_B5CF995D_BB3F_679C_41B2_DD18FBDD393B); this.mainPlayList.set('selectedIndex', 9)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.33,
   "image": "this.AnimatedImageResource_A364578C_B478_E759_41DA_D958D3157677",
   "pitch": -5.43,
   "yaw": -90.59,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A7588CB2_B478_A949_41E1_BA0E2F7A3C1E",
 "maps": [
  {
   "hfov": 2.33,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -90.59,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB4975DB_B418_FAFF_41E0_72C5A527492C_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -5.43
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7EA62FDF_7498_7BEB_41B0_E9C030E0910C, this.camera_B4AC6A4F_BB3F_65FC_41E0_3841C909F1B1); this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.92,
   "image": "this.AnimatedImageResource_AC054C05_B4E8_6948_41C3_37EE2700BB2C",
   "pitch": -16.94,
   "yaw": -91.96,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A1193899_B439_A97B_41B6_698BBDA5941E",
 "maps": [
  {
   "hfov": 11.92,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -91.96,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7B96437_B438_B9B7_41D3_8359BF07DA8B_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -16.94
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7FD5281A_7498_4475_41D5_125CE4CC7753, this.camera_B4BBFA34_BB3F_65AC_41E6_E0315EEC61A2); this.mainPlayList.set('selectedIndex', 0)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.67,
   "image": "this.AnimatedImageResource_AC029C05_B4E8_6948_41DA_B7EC27D1DAC2",
   "pitch": -9.94,
   "yaw": 86.09,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A11CC5FE_B438_5AB9_41DC_2DB08F3447F9",
 "maps": [
  {
   "hfov": 7.67,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 86.09,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7B96437_B438_B9B7_41D3_8359BF07DA8B_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -9.94
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A7B936D4_B438_66C8_41D7_BBFCC5890205, this.camera_B4DCAA66_BB3F_65AC_41A6_AFCDBE7CE095); this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.26,
   "image": "this.AnimatedImageResource_AC02FC05_B4E8_6948_41E4_B055B495AD34",
   "pitch": -4.72,
   "yaw": -20.14,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A210D007_B429_D957_41DA_2C9E2040E52A",
 "maps": [
  {
   "hfov": 2.26,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -20.14,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7B96437_B438_B9B7_41D3_8359BF07DA8B_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -4.72
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7EA62FDF_7498_7BEB_41B0_E9C030E0910C, this.camera_B497CA1D_BB3F_659C_41D4_6773902634D1); this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.22,
   "image": "this.AnimatedImageResource_7A0B641E_7498_4C6D_41C8_BFC9042E3D94",
   "pitch": -2.87,
   "yaw": 81.45,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_7BA1DAD7_7498_45FB_41B8_E95D122063E4",
 "maps": [
  {
   "hfov": 6.22,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 81.45,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7EC7D790_7498_4C75_41CB_BD28A22679B2_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -2.87
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7EA21F0F_7498_5C6A_41D8_19929C3AC58B, this.camera_B488EA29_BB3F_65A4_41C8_6A943BE2C168); this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.33,
   "image": "this.AnimatedImageResource_7BD0AF99_7498_7C77_41B7_8C2C9ADBCCC8",
   "pitch": -4.39,
   "yaw": -98.46,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_7B077551_7498_CCF7_41D4_A3A1B1705875",
 "maps": [
  {
   "hfov": 4.33,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -98.46,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7EC7D790_7498_4C75_41CB_BD28A22679B2_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -4.39
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BB48943D_B418_B9BB_41DE_BEF438B84FDE, this.camera_B40369B6_BB3F_66AC_41DB_73B4BCA036E9); this.mainPlayList.set('selectedIndex', 11)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.31,
   "image": "this.AnimatedImageResource_A7B3CC8A_B429_E959_41D8_8338BAFAAE33",
   "pitch": -9.07,
   "yaw": 92.57,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A51490AA_B42F_F959_41C2_11EF341710B6",
 "maps": [
  {
   "hfov": 2.31,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 92.57,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7EA21DB9_7498_BFB7_41B6_6780B5D32237_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -9.07
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BB48DE80_B418_E949_41D5_AC51A1BC4CDE, this.camera_B43759C1_BB3F_66E4_41E1_407277F72169); this.mainPlayList.set('selectedIndex', 13)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.36,
   "image": "this.AnimatedImageResource_A7B38C8B_B429_E95F_41E2_E85BAA3A5AB0",
   "pitch": -4.77,
   "yaw": -86.73,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A086F29E_B418_5979_41E1_700C254AEB53",
 "maps": [
  {
   "hfov": 3.36,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -86.73,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7EA21DB9_7498_BFB7_41B6_6780B5D32237_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -4.77
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A7B91B96_B438_EF49_41D0_EA4C08E176A7, this.camera_AB2B9AFC_BB3F_7A9C_41C6_FAB77B3DCF5E); this.mainPlayList.set('selectedIndex', 23)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.39,
   "image": "this.AnimatedImageResource_97F71D70_B5E8_6BC7_41D6_AC529A744B7F",
   "pitch": -7.54,
   "yaw": -8.7,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_AE62505F_B418_79F8_41E5_837B4D27B9CB",
 "maps": [
  {
   "hfov": 2.39,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -8.7,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A78661E2_B438_7AC9_41D6_BADE776856B8_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -7.54
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7ECAB660_7498_4CD6_41D4_1A5A06463D23, this.camera_AB5C5B07_BB3F_7B6C_41D4_ADE5210A03B0); this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.83,
   "image": "this.AnimatedImageResource_97F48D72_B5E8_6BCB_41C5_10592E26DEF2",
   "pitch": -12.24,
   "yaw": 96.93,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_AE6C3EA0_B419_E948_41DB_BCDDE422866C",
 "maps": [
  {
   "hfov": 5.83,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 96.93,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A78661E2_B438_7AC9_41D6_BADE776856B8_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -12.24
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showPopupPanoramaOverlay(this.popup_7C0E8F0F_69F2_5E99_41B1_4AB4B4132415, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'paddingTop':5,'rollOverIconWidth':20,'pressedBorderSize':0,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingRight':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'paddingBottom':5,'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_70A74095_69F2_4389_41D2_F0D030EE7B7D, null, null, null, null, false)"
  }
 ],
 "data": {
  "label": "Info 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.32,
   "image": "this.AnimatedImageResource_7151507B_69F2_4379_41BE_365DFAE0D0E2",
   "pitch": 1.07,
   "yaw": -96.22,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_7C998C58_698D_C286_41A5_1ADB3EA67B94",
 "maps": [
  {
   "hfov": 5.32,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -96.22,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A78661E2_B438_7AC9_41D6_BADE776856B8_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 1.07
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A786980F_B438_A958_41CC_E1CD8D96840B, this.camera_B59F38E8_BB3F_66A4_41D8_48E5929920A8); this.mainPlayList.set('selectedIndex', 14)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.98,
   "image": "this.AnimatedImageResource_97F4CD72_B5E8_6BCB_41B3_42AD090FEEA7",
   "pitch": -1.73,
   "yaw": 57.71,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_AC13AEEB_B4F9_E6D8_41C5_D67EEFB81BCB",
 "maps": [
  {
   "hfov": 0.98,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 57.71,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7B90CA2_B438_6949_41D9_FECD4F9980FC_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -1.73
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A7808C0B_B43F_A958_41AE_36DF5B301090, this.camera_B568D8D0_BB3F_66E4_41CA_2F7AB8351FAE); this.mainPlayList.set('selectedIndex', 15)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.63,
   "image": "this.AnimatedImageResource_97F42D73_B5E8_6BC9_41CD_C967EAE46FD0",
   "pitch": -6.67,
   "yaw": 122.69,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_ADB6B839_B4E8_E9B8_41D3_0344D8A3678C",
 "maps": [
  {
   "hfov": 2.63,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 122.69,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7B90CA2_B438_6949_41D9_FECD4F9980FC_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -6.67
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A7BEF0A3_B43F_B94F_41B9_9975BB394A37, this.camera_B56F08BD_BB3F_669C_41DF_77491EB401BF); this.mainPlayList.set('selectedIndex', 20)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.22,
   "image": "this.AnimatedImageResource_76DBEE9A_698E_7FBF_41D1_889DC22BDAC5",
   "pitch": -2.75,
   "yaw": 36.07,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_7198FA7B_6992_477E_41D9_A0DE0FAEF8DA",
 "maps": [
  {
   "hfov": 4.22,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 36.07,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7B90CA2_B438_6949_41D9_FECD4F9980FC_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -2.75
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A7BEAAF4_B43F_EEC9_41D7_7EF99E7900B7, this.camera_B57508AC_BB3F_66BC_41E3_82F622BF23A4); this.mainPlayList.set('selectedIndex', 18)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.73,
   "image": "this.AnimatedImageResource_76DB5E9A_698E_7FBF_41D8_8A91B5F1D9A0",
   "pitch": -5.44,
   "yaw": -133.03,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_736E6D78_6996_FD7A_41C1_7409ECA33931",
 "maps": [
  {
   "hfov": 2.73,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -133.03,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7B90CA2_B438_6949_41D9_FECD4F9980FC_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -5.44
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A0366EF2_B43F_E6C9_41D0_B451038B8996, this.camera_B56238DB_BB3F_66E4_41E3_D8B06177AA75); this.mainPlayList.set('selectedIndex', 17)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.79,
   "image": "this.AnimatedImageResource_76DB0E9A_698E_7FBF_41C6_8EDE209F4B5B",
   "pitch": -5.87,
   "yaw": 170.31,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_73679BB5_698D_C5F5_41D0_ED627BE8C5AF",
 "maps": [
  {
   "hfov": 2.79,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 170.31,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7B90CA2_B438_6949_41D9_FECD4F9980FC_0_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -5.87
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7EA21F0F_7498_5C6A_41D8_19929C3AC58B, this.camera_B5A22943_BB3F_67E4_41C8_C24DACF0DE64); this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.78,
   "image": "this.AnimatedImageResource_BB4AF0D6_B428_5AC9_41D3_CC222BEDDA00",
   "pitch": -2.48,
   "yaw": 89.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A46071E8_B428_BADA_41E1_5278213F5ECA",
 "maps": [
  {
   "hfov": 2.78,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 89.87,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7ECAB660_7498_4CD6_41D4_1A5A06463D23_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -2.48
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A78661E2_B438_7AC9_41D6_BADE776856B8, this.camera_B5D9C951_BB3F_67E4_41DF_DA812FE660D5); this.mainPlayList.set('selectedIndex', 21)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.34,
   "image": "this.AnimatedImageResource_97CC6D64_B5E8_6BCF_41CA_46FE4FB9302A",
   "pitch": -2.6,
   "yaw": 41.68,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_AFE1B4A2_B418_5948_41DE_A751E24BA353",
 "maps": [
  {
   "hfov": 4.34,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 41.68,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7ECAB660_7498_4CD6_41D4_1A5A06463D23_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -2.6
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showPopupPanoramaOverlay(this.popup_7C964E13_6993_DE8B_41CF_AEBF7D02752C, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'paddingTop':5,'rollOverIconWidth':20,'pressedBorderSize':0,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingRight':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'paddingBottom':5,'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_70B4308B_69F2_4399_41D5_0D0A7AB54601, null, null, null, null, false)"
  }
 ],
 "data": {
  "label": "Info 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.29,
   "image": "this.AnimatedImageResource_716B0079_69F2_4379_41C8_3D3544B86FFF",
   "pitch": -6.03,
   "yaw": -153.76,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_7D02EC52_6993_C285_41D3_31BE595E80D8",
 "maps": [
  {
   "hfov": 5.29,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -153.76,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7ECAB660_7498_4CD6_41D4_1A5A06463D23_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -6.03
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A78661E2_B438_7AC9_41D6_BADE776856B8, this.camera_AAA5283C_BB3F_659C_41D6_C17A83A6B1A4); this.mainPlayList.set('selectedIndex', 21)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.08,
   "image": "this.AnimatedImageResource_97F30D76_B5E8_6BCB_41C1_E41E7202736B",
   "pitch": -4.16,
   "yaw": 0.52,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_AE06C0F6_B419_DAC8_41E3_C2042FE8AA16",
 "maps": [
  {
   "hfov": 3.08,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0.52,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7B91B96_B438_EF49_41D0_EA4C08E176A7_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -4.16
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A7924FCC_B438_A6D8_41E4_F69093B7B763, this.camera_B57C7893_BB3F_6564_4198_05EDE4C3CC9E); this.mainPlayList.set('selectedIndex', 22)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.02,
   "image": "this.AnimatedImageResource_C79AC3A4_DE75_44BC_41E7_C7025012A0CB",
   "pitch": -3.19,
   "yaw": 94.1,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_C84C3826_DE7B_43BC_41A8_69C4EBF067D0",
 "maps": [
  {
   "hfov": 2.02,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 94.1,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7B91B96_B438_EF49_41D0_EA4C08E176A7_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -3.19
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7EA21F0F_7498_5C6A_41D8_19929C3AC58B, this.camera_B578A89F_BB3F_669C_41B6_874CE6F71991); this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.86,
   "image": "this.AnimatedImageResource_C79B53A4_DE75_44BC_41CD_BCDCCE79D14E",
   "pitch": -8.5,
   "yaw": -85.64,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_C97D9BA9_DE76_C4B4_41C0_57E64120280B",
 "maps": [
  {
   "hfov": 4.86,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -85.64,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7B91B96_B438_EF49_41D0_EA4C08E176A7_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -8.5
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7EA62FDF_7498_7BEB_41B0_E9C030E0910C, this.camera_AAB9A818_BB3F_6564_41DA_EC8EA81A9C5B); this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.46,
   "image": "this.AnimatedImageResource_ACFDFBFD_B4E8_6EBB_41D7_19FAFBF46EF3",
   "pitch": -5.12,
   "yaw": -92.14,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_79A5D33B_7498_C4AB_41D2_6916334D3130",
 "maps": [
  {
   "hfov": 2.46,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -92.14,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD5281A_7498_4475_41D5_125CE4CC7753_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -5.12
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A7B96437_B438_B9B7_41D3_8359BF07DA8B, this.camera_AAAE9829_BB3F_65A4_41E0_5BB1C4EC666D); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.07,
   "image": "this.AnimatedImageResource_C206F8A4_DE55_44BC_41C0_F00C4B5798C4",
   "pitch": -8.55,
   "yaw": -85.91,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A0C05168_B43B_DBD8_41E2_6469E05FC354",
 "maps": [
  {
   "hfov": 3.07,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -85.91,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7FD5281A_7498_4475_41D5_125CE4CC7753_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -8.55
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A786980F_B438_A958_41CC_E1CD8D96840B, this.camera_B4E43AC7_BB3F_7AEC_41E4_A0F6359FF180); this.mainPlayList.set('selectedIndex', 14)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.51,
   "image": "this.AnimatedImageResource_97C97D69_B5E8_6BD9_41DA_E005778B6270",
   "pitch": -3.78,
   "yaw": 112.27,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A8D83B87_B4E9_AF57_41E2_C77EE6622707",
 "maps": [
  {
   "hfov": 1.51,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 112.27,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7808C0B_B43F_A958_41AE_36DF5B301090_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -3.78
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A7924FCC_B438_A6D8_41E4_F69093B7B763, this.camera_B4C0DA96_BB3F_656C_41B7_DE3605EF7133); this.mainPlayList.set('selectedIndex', 22)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.47,
   "image": "this.AnimatedImageResource_97F6ED69_B5E8_6BD9_41E6_67D485C3A4A2",
   "pitch": -16.41,
   "yaw": -178.1,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_AD1DE70F_B419_E758_41AF_C7AEF3E91D89",
 "maps": [
  {
   "hfov": 6.47,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -178.1,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7808C0B_B43F_A958_41AE_36DF5B301090_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -16.41
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A0366EF2_B43F_E6C9_41D0_B451038B8996, this.camera_B4F3AAB1_BB3F_7AA4_41C9_2EF70DC08390); this.mainPlayList.set('selectedIndex', 17)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.76,
   "image": "this.AnimatedImageResource_97F65D69_B5E8_6BDC_41E1_E45A44D11723",
   "pitch": -5.94,
   "yaw": -75.77,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A822F1B2_B42B_DB4B_41E5_988C7C7F29EB",
 "maps": [
  {
   "hfov": 5.76,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -75.77,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7808C0B_B43F_A958_41AE_36DF5B301090_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -5.94
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A7B90CA2_B438_6949_41D9_FECD4F9980FC, this.camera_AB099AE3_BB3F_7AA4_41E2_4A874C405713); this.mainPlayList.set('selectedIndex', 16)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.64,
   "image": "this.AnimatedImageResource_76D61E96_698E_7FB7_41B9_0795A825A540",
   "pitch": -2.7,
   "yaw": 33.91,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_AB7C80D2_B418_FACB_4195_CC262FE9BF44",
 "maps": [
  {
   "hfov": 2.64,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 33.91,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7808C0B_B43F_A958_41AE_36DF5B301090_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -2.7
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A7BEAAF4_B43F_EEC9_41D7_7EF99E7900B7, this.camera_AB389AF2_BB3F_7AA4_41CB_10DE375D4278); this.mainPlayList.set('selectedIndex', 18)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.12,
   "image": "this.AnimatedImageResource_932A9A65_B418_69C9_41E1_6692E6D1AA0A",
   "pitch": -1.77,
   "yaw": -37.44,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_947D1840_B41F_A9C7_41E1_0372229789D1",
 "maps": [
  {
   "hfov": 2.12,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -37.44,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7808C0B_B43F_A958_41AE_36DF5B301090_0_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -1.77
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A78285F6_B43F_DAC9_41D5_DC8F7DA52DC0, this.camera_AB171AD8_BB3F_7AE4_41E2_B9F388CA9363); this.mainPlayList.set('selectedIndex', 19)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.6,
   "image": "this.AnimatedImageResource_932A0A69_B418_69D9_41E1_80E8E5095551",
   "pitch": -0.45,
   "yaw": -29.74,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_95025D04_B418_AB4E_41E2_378B29D65B8B",
 "maps": [
  {
   "hfov": 1.6,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -29.74,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7808C0B_B43F_A958_41AE_36DF5B301090_0_HS_5_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -0.45
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showPopupPanoramaOverlay(this.popup_7E2894E8_69F6_4387_41D1_B8D6C9AF71B4, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'paddingTop':5,'rollOverIconWidth':20,'pressedBorderSize':0,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingRight':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'paddingBottom':5,'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_7375EF89_698E_5D9B_41C8_19FDD3D997DD, null, null, null, null, false)"
  }
 ],
 "data": {
  "label": "Info 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.31,
   "image": "this.AnimatedImageResource_73484F77_698E_5D77_41D7_5E680546D199",
   "pitch": -3.59,
   "yaw": -46.6,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_7F11328C_69F6_4798_41D6_EB357408A9A8",
 "maps": [
  {
   "hfov": 5.31,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -46.6,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7808C0B_B43F_A958_41AE_36DF5B301090_0_HS_6_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -3.59
  }
 ]
},
{
 "textDecoration": "none",
 "layout": "horizontal",
 "horizontalAlign": "center",
 "backgroundColorRatios": [
  0
 ],
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_4D1C404A_5A87_C3B6_41BC_63B811C40CD0",
 "propagateClick": false,
 "width": 60,
 "data": {
  "name": "Button settings VR"
 },
 "shadowColor": "#000000",
 "fontFamily": "Arial",
 "paddingLeft": 0,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "shadowSpread": 1,
 "minWidth": 1,
 "iconHeight": 30,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "rollOverBackgroundOpacity": 1,
 "height": 60,
 "mode": "push",
 "fontSize": 12,
 "backgroundColor": [
  "#F7931E"
 ],
 "shadowBlurRadius": 6,
 "shadow": false,
 "gap": 5,
 "iconBeforeLabel": true,
 "fontStyle": "normal",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#CE6700"
 ],
 "class": "Button",
 "paddingRight": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "pressedIconURL": "skin/Button_4D1C404A_5A87_C3B6_41BC_63B811C40CD0_pressed.png",
 "backgroundOpacity": 1,
 "paddingBottom": 0,
 "iconWidth": 30,
 "cursor": "hand",
 "iconURL": "skin/Button_4D1C404A_5A87_C3B6_41BC_63B811C40CD0.png",
 "fontWeight": "normal"
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A786980F_B438_A958_41CC_E1CD8D96840B, this.camera_B45549E3_BB3F_66A4_41DC_B34606CC9514); this.mainPlayList.set('selectedIndex', 14)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.97,
   "image": "this.AnimatedImageResource_AC04CC04_B4E8_6948_41D9_065D53F66B86",
   "pitch": -4.43,
   "yaw": -58.69,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A2DF9CC2_B42B_AAC8_41E1_4A02D154134A",
 "maps": [
  {
   "hfov": 2.97,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -58.69,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7B936D4_B438_66C8_41D7_BBFCC5890205_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -4.43
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A7B96437_B438_B9B7_41D3_8359BF07DA8B, this.camera_B45EA9D8_BB3F_66E4_41DF_851F9A0F56DC); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.18,
   "image": "this.AnimatedImageResource_73548FC7_6992_3D97_41D5_093A52540FC2",
   "pitch": -3.58,
   "yaw": 143.83,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_7E1E3C15_6992_428B_41DA_5F90658F78B8",
 "maps": [
  {
   "hfov": 3.18,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 143.83,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7B936D4_B438_66C8_41D7_BBFCC5890205_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -3.58
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A7BEAAF4_B43F_EEC9_41D7_7EF99E7900B7, this.camera_B40D09A9_BB3F_66A4_41B6_704565304B5B); this.mainPlayList.set('selectedIndex', 18)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.29,
   "image": "this.AnimatedImageResource_97C80D68_B5E8_6BC7_41D4_D38C8C51F46C",
   "pitch": -7.54,
   "yaw": -43.92,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A8789C2A_B428_A958_41D5_E96C3F71EE83",
 "maps": [
  {
   "hfov": 4.29,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -43.92,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A0366EF2_B43F_E6C9_41D0_B451038B8996_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -7.54
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showPopupPanoramaOverlay(this.popup_7F8DA5E4_6996_4D8E_41B3_CECE4ACA7501, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'paddingTop':5,'rollOverIconWidth':20,'pressedBorderSize':0,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingRight':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'paddingBottom':5,'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_70BF008C_69F2_439F_41D1_93D689E4DA4B, null, null, null, null, false)"
  }
 ],
 "data": {
  "label": "Info 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.31,
   "image": "this.AnimatedImageResource_716F2079_69F2_4379_41D3_18A6E3D846EF",
   "pitch": 3.47,
   "yaw": -82.93,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_7C233174_6996_428E_41C5_32B1E250B4FD",
 "maps": [
  {
   "hfov": 5.31,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -82.93,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A0366EF2_B43F_E6C9_41D0_B451038B8996_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 3.47
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A7808C0B_B43F_A958_41AE_36DF5B301090, this.camera_B5E3398B_BB3F_6764_41DF_EA33D0586985); this.mainPlayList.set('selectedIndex', 15)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.22,
   "image": "this.AnimatedImageResource_723628E7_69B7_C394_41D6_EC7CA91AC453",
   "pitch": -6.49,
   "yaw": 78.33,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_72D6B834_69B2_C28B_41CD_DFFC2E0DD370",
 "maps": [
  {
   "hfov": 5.22,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 78.33,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A0366EF2_B43F_E6C9_41D0_B451038B8996_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -6.49
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A7B90CA2_B438_6949_41D9_FECD4F9980FC, this.camera_B4191998_BB3F_6764_41D4_40253A313F26); this.mainPlayList.set('selectedIndex', 16)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.53,
   "image": "this.AnimatedImageResource_723648E7_69B7_C394_41B7_C0EBCED42250",
   "pitch": -2.36,
   "yaw": 40.92,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_72131461_69B6_428C_41B1_1E8451E0886C",
 "maps": [
  {
   "hfov": 2.53,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 40.92,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A0366EF2_B43F_E6C9_41D0_B451038B8996_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -2.36
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A7BEAAF4_B43F_EEC9_41D7_7EF99E7900B7, this.camera_ABA4BB65_BB3F_7BAC_41DE_213EE9FC1DA8); this.mainPlayList.set('selectedIndex', 18)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.97,
   "image": "this.AnimatedImageResource_97C91D69_B5E8_6BD9_41D7_F2633C515509",
   "pitch": -5.24,
   "yaw": 166.83,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_AA87AB3D_B418_AFB8_41DC_C2487DBA1864",
 "maps": [
  {
   "hfov": 1.97,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 166.83,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A78285F6_B43F_DAC9_41D5_DC8F7DA52DC0_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -5.24
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A7808C0B_B43F_A958_41AE_36DF5B301090, this.camera_ABB58B5B_BB3F_7BE4_41B5_DEA41D1A6B5D); this.mainPlayList.set('selectedIndex', 15)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.34,
   "image": "this.AnimatedImageResource_932F7A63_B418_69C9_41E3_69302B9E54B8",
   "pitch": -1.95,
   "yaw": 146.2,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_944774CF_B41B_DAD9_41D8_F7376342BF52",
 "maps": [
  {
   "hfov": 1.34,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 146.2,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A78285F6_B43F_DAC9_41D5_DC8F7DA52DC0_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -1.95
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showPopupPanoramaOverlay(this.popup_7D4732AE_6992_479A_41D8_34FF02FF2036, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'paddingTop':5,'rollOverIconWidth':20,'pressedBorderSize':0,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingRight':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'paddingBottom':5,'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_70BCB08C_69F2_439F_41C4_EAC3EA88E980, null, null, null, null, false)"
  }
 ],
 "data": {
  "label": "Info 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.32,
   "image": "this.AnimatedImageResource_716D007B_69F2_4379_41DA_4B06EDC52540",
   "pitch": 1.64,
   "yaw": -80.02,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_7C5B620B_6995_C699_41A8_9FF7C9C3D30D",
 "maps": [
  {
   "hfov": 5.32,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -80.02,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A78285F6_B43F_DAC9_41D5_DC8F7DA52DC0_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 1.64
  }
 ]
},
{
 "class": "PanoramaCameraSequence",
 "restartMovementOnUserInteraction": false,
 "id": "sequence_74510F9A_6993_DDBC_41CF_70A289805155",
 "movements": [
  {
   "class": "DistancePanoramaCameraMovement",
   "easing": "cubic_in",
   "yawDelta": 18.5,
   "yawSpeed": 7.96
  },
  {
   "class": "DistancePanoramaCameraMovement",
   "easing": "linear",
   "yawDelta": 323,
   "yawSpeed": 7.96
  },
  {
   "class": "DistancePanoramaCameraMovement",
   "easing": "cubic_out",
   "yawDelta": 18.5,
   "yawSpeed": 7.96
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showPopupPanoramaOverlay(this.popup_7DBE1BE6_6992_C58C_41D9_D3946B1A5DFD, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'paddingTop':5,'rollOverIconWidth':20,'pressedBorderSize':0,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingRight':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'paddingBottom':5,'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_70A81098_69F2_4387_41D9_51321BAD9FD9, null, null, null, null, false)"
  }
 ],
 "data": {
  "label": "Info 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.72,
   "image": "this.AnimatedImageResource_7154107B_69F2_4379_4174_709A24C7EEE6",
   "pitch": -17.99,
   "yaw": -35.52,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_7DF865BB_6992_4D84_41BB_70AAAF547570",
 "maps": [
  {
   "hfov": 3.72,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -35.52,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_95EBD687_B439_F94A_41D8_B3A956CC1C1A_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -17.99
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showPopupPanoramaOverlay(this.popup_7D9DDA2B_6995_C69B_41D9_5DF1519FB31C, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'paddingTop':5,'rollOverIconWidth':20,'pressedBorderSize':0,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingRight':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'paddingBottom':5,'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_70AFE098_69F2_4387_41D4_0C8536919AA2, null, null, null, null, false)"
  }
 ],
 "data": {
  "label": "Info 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.73,
   "image": "this.AnimatedImageResource_7154B07B_69F2_4379_419C_83A1101993B7",
   "pitch": -20.63,
   "yaw": 13.15,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_7CF03BDB_6992_45BB_41C2_C6133B0F15FF",
 "maps": [
  {
   "hfov": 2.73,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 13.15,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_95EBD687_B439_F94A_41D8_B3A956CC1C1A_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -20.63
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showPopupPanoramaOverlay(this.popup_7D554A76_6992_468A_41D7_B705F950CC38, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'paddingTop':5,'rollOverIconWidth':20,'pressedBorderSize':0,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingRight':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'paddingBottom':5,'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_70AE9098_69F2_4387_41CF_57F01BD0ECAD, null, null, null, null, false)"
  }
 ],
 "data": {
  "label": "Info 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.57,
   "image": "this.AnimatedImageResource_715B607B_69F2_4379_41C4_5BBC78181461",
   "pitch": 0.48,
   "yaw": -175.74,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_7D6E4722_6992_CE8A_41B8_787C8D0DE823",
 "maps": [
  {
   "hfov": 3.57,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -175.74,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_95EBD687_B439_F94A_41D8_B3A956CC1C1A_0_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 0.48
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BBB1C0DB_B418_7AFE_41E5_7573BE28445D, this.camera_B5EF397E_BB3F_679C_41D1_FB43C0EDA64D); this.mainPlayList.set('selectedIndex', 10)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.75,
   "image": "this.AnimatedImageResource_A364F78C_B478_E759_41AE_07CEFACDB860",
   "pitch": -3.22,
   "yaw": -78.91,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A712BB2F_B468_AF57_41D2_496549742A54",
 "maps": [
  {
   "hfov": 1.75,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -78.91,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BBA93A6D_B418_A9DA_41DF_BE4E0F1A548B_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -3.22
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BB4975DB_B418_FAFF_41E0_72C5A527492C, this.camera_B5F98974_BB3F_67AC_41C2_54D321481E09); this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.88,
   "image": "this.AnimatedImageResource_A364A78D_B478_E75B_416D_B1A16796F7CE",
   "pitch": -3.11,
   "yaw": 11.59,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A655375E_B469_A7F9_41D7_F316B37EA394",
 "maps": [
  {
   "hfov": 2.88,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 11.59,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BBA93A6D_B418_A9DA_41DF_BE4E0F1A548B_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -3.11
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BBB08BDF_B418_EEF6_41B4_912FC2FCEF8E, this.camera_B5C2B968_BB3F_67A4_4197_495FE216151A); this.mainPlayList.set('selectedIndex', 7)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.89,
   "image": "this.AnimatedImageResource_A365178D_B478_E75B_41D4_7B208A44D4C7",
   "pitch": -12.46,
   "yaw": 173.03,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A6116F15_B478_E74A_41CE_068A01019531",
 "maps": [
  {
   "hfov": 2.89,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 173.03,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BBA93A6D_B418_A9DA_41DF_BE4E0F1A548B_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -12.46
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showPopupPanoramaOverlay(this.popup_7C35A27D_6996_C77C_41B2_08BD717634D0, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'paddingTop':5,'rollOverIconWidth':20,'pressedBorderSize':0,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingRight':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'paddingBottom':5,'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_70A92095_69F2_4389_4191_1A237B380F13, null, null, null, null, false)"
  }
 ],
 "data": {
  "label": "Info 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.51,
   "image": "this.AnimatedImageResource_7154607B_69F2_4379_41C4_F9D411C6D314",
   "pitch": -6.57,
   "yaw": -2.51,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_7D4D868F_6996_4F9B_41AB_871E71FAEF23",
 "maps": [
  {
   "hfov": 3.51,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -2.51,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_95C2995D_B439_EBFE_41E4_BB7C848E21F6_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -6.57
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7EA21DB9_7498_BFB7_41B6_6780B5D32237, this.camera_B42B09CD_BB3F_66FC_419C_59E30AEEB687); this.mainPlayList.set('selectedIndex', 12)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.81,
   "image": "this.AnimatedImageResource_A364378C_B478_E759_41DF_DE749BECCD17",
   "pitch": -10.23,
   "yaw": 89.43,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A633131D_B468_5F7B_41E4_56E286BC695F",
 "maps": [
  {
   "hfov": 2.81,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 89.43,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB48DE80_B418_E949_41D5_AC51A1BC4CDE_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -10.23
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7EC7D790_7498_4C75_41CB_BD28A22679B2, this.camera_AB657B34_BB3F_7BAC_41E1_497E38CD763A); this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.68,
   "image": "this.AnimatedImageResource_A72E4E60_B428_A9CA_41DF_545D82FF45FD",
   "pitch": -0.97,
   "yaw": 74.95,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_7B1E082E_7498_44AD_41CC_7BC396F4824A",
 "maps": [
  {
   "hfov": 2.68,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 74.95,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7EA21F0F_7498_5C6A_41D8_19929C3AC58B_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -0.97
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7ECAB660_7498_4CD6_41D4_1A5A06463D23, this.camera_AB90DB48_BB3F_7BE4_41C6_38055A98A9A4); this.mainPlayList.set('selectedIndex', 12); this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.1,
   "image": "this.AnimatedImageResource_A5C671DB_B429_DAFE_41BB_C2A358399F0E",
   "pitch": -6.46,
   "yaw": -91.6,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_B997430D_B41B_DF5A_41D1_DC45477503CA",
 "maps": [
  {
   "hfov": 4.1,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -91.6,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7EA21F0F_7498_5C6A_41D8_19929C3AC58B_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -6.46
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BB48943D_B418_B9BB_41DE_BEF438B84FDE, this.camera_AB82AB52_BB3F_7BE4_41A9_D6462D6B1858); this.mainPlayList.set('selectedIndex', 11)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.75,
   "image": "this.AnimatedImageResource_A1DC749A_B418_D979_41D9_ED98925917D2",
   "pitch": -4.98,
   "yaw": 152.79,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_BB1CECB4_B43B_A94A_41D3_80630F48D91D",
 "maps": [
  {
   "hfov": 1.75,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 152.79,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7EA21F0F_7498_5C6A_41D8_19929C3AC58B_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -4.98
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A7B91B96_B438_EF49_41D0_EA4C08E176A7, this.camera_AB70CB28_BB3F_7BA4_41E4_48105200FA1A); this.mainPlayList.set('selectedIndex', 23)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.56,
   "image": "this.AnimatedImageResource_C76EE39F_DE75_448B_41C1_475CC1A03EFB",
   "pitch": -5.77,
   "yaw": -0.57,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_C8F64ED7_DE76_DC9B_41CE_1B11F95B13CC",
 "maps": [
  {
   "hfov": 3.56,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -0.57,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7EA21F0F_7498_5C6A_41D8_19929C3AC58B_0_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -5.77
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7FD5281A_7498_4475_41D5_125CE4CC7753, this.camera_B58D290D_BB3F_677C_41A0_C007CE5FA2EF); this.mainPlayList.set('selectedIndex', 0)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.26,
   "image": "this.AnimatedImageResource_7BEDE7E3_7498_4BDB_419C_9886E8AA8023",
   "pitch": -1.64,
   "yaw": 68.36,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_7A369C90_749B_BC75_41C1_1C3D433F0AAC",
 "maps": [
  {
   "hfov": 4.26,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 68.36,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7EA62FDF_7498_7BEB_41B0_E9C030E0910C_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -1.64
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7EC7D790_7498_4C75_41CB_BD28A22679B2, this.camera_B5B94926_BB3F_67AC_41DB_091BF9790A1D); this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.96,
   "image": "this.AnimatedImageResource_7A0B041E_7498_4C6D_41CD_8DDE01B61CEA",
   "pitch": -6.03,
   "yaw": -108.97,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_7A2BC80D_7498_446E_41C1_A13EEEBDD74C",
 "maps": [
  {
   "hfov": 4.96,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -108.97,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7EA62FDF_7498_7BEB_41B0_E9C030E0910C_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -6.03
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BBB1C0DB_B418_7AFE_41E5_7573BE28445D, this.camera_B580D918_BB3F_6764_41D6_D4A2A120D828); this.mainPlayList.set('selectedIndex', 10)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.35,
   "image": "this.AnimatedImageResource_ACFBAC00_B4E8_6948_41CB_FA697DAEC034",
   "pitch": -7.24,
   "yaw": 177.51,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A3795A44_B428_E9C9_41E1_079ACF473537",
 "maps": [
  {
   "hfov": 2.35,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 177.51,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7EA62FDF_7498_7BEB_41B0_E9C030E0910C_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -7.24
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A7B96437_B438_B9B7_41D3_8359BF07DA8B, this.camera_B5AC5936_BB3F_67AC_41DC_60820A7E8C1D); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.8,
   "image": "this.AnimatedImageResource_CCBC2E67_DDBB_BFBB_41EB_85702C214055",
   "pitch": -14.93,
   "yaw": 64.38,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_97150702_B428_674B_41E1_35E93DC76B75",
 "maps": [
  {
   "hfov": 4.8,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 64.38,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7EA62FDF_7498_7BEB_41B0_E9C030E0910C_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -14.93
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 15)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.65,
   "image": "this.AnimatedImageResource_73451F77_698E_5D77_41DA_026FF9077A40",
   "pitch": -5.16,
   "yaw": -140.74,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_AB716A74_B419_E9CF_41C5_F49DB09F398C",
 "maps": [
  {
   "hfov": 2.65,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -140.74,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7BEF0A3_B43F_B94F_41B9_9975BB394A37_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -5.16
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showPopupPanoramaOverlay(this.popup_7FC3EA5A_6992_46BA_41D1_DE698FE2B38C, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'paddingTop':5,'rollOverIconWidth':20,'pressedBorderSize':0,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingRight':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'paddingBottom':5,'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_70A2408C_69F2_439F_41CC_E21F71A239B5, null, null, null, null, false)"
  }
 ],
 "data": {
  "label": "Info 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.32,
   "image": "this.AnimatedImageResource_716C507B_69F2_4379_4167_32FC0E92322D",
   "pitch": 2.94,
   "yaw": -92.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_7C64B772_6992_CE8A_41C1_74F633432A88",
 "maps": [
  {
   "hfov": 5.32,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -92.87,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7BEF0A3_B43F_B94F_41B9_9975BB394A37_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 2.94
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A786980F_B438_A958_41CC_E1CD8D96840B, this.camera_B47CE9FC_BB3F_669C_4183_BB36C1575E75); this.mainPlayList.set('selectedIndex', 14)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.82,
   "image": "this.AnimatedImageResource_73467F77_698E_5D77_41CB_ED6E07C5EAFF",
   "pitch": -6.99,
   "yaw": 164.51,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_7C148844_69F6_C288_41CE_4D92A68BF945",
 "maps": [
  {
   "hfov": 3.82,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 164.51,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7BEF0A3_B43F_B94F_41B9_9975BB394A37_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -6.99
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A7B90CA2_B438_6949_41D9_FECD4F9980FC, this.camera_B448C9F1_BB3F_66A4_4197_70D2807B5C90); this.mainPlayList.set('selectedIndex', 16)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.58,
   "image": "this.AnimatedImageResource_76D56E8D_698E_7F95_41D9_38A4274ED816",
   "pitch": -7.18,
   "yaw": -105.08,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_7116566E_6997_CE96_41D9_42AD45BF6ACB",
 "maps": [
  {
   "hfov": 3.58,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -105.08,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7BEF0A3_B43F_B94F_41B9_9975BB394A37_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -7.18
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A7808C0B_B43F_A958_41AE_36DF5B301090, this.camera_B59918F5_BB3F_66AC_41DA_16F5544FD25D); this.mainPlayList.set('selectedIndex', 15)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.3,
   "image": "this.AnimatedImageResource_97F21D74_B5E8_6BCF_41E0_7E04824374CF",
   "pitch": -9.63,
   "yaw": 74.81,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_AE254CEB_B418_6ADF_41E3_B6ACC297C527",
 "maps": [
  {
   "hfov": 5.3,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 74.81,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7924FCC_B438_A6D8_41E4_F69093B7B763_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -9.63
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A7B91B96_B438_EF49_41D0_EA4C08E176A7, this.camera_B5926900_BB3F_6764_41D5_91A7968B0378); this.mainPlayList.set('selectedIndex', 23)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.03,
   "image": "this.AnimatedImageResource_97F39D75_B5E8_6BC9_41D3_AE93AD181419",
   "pitch": -3.06,
   "yaw": -98.23,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_AE2ED2D7_B418_7EC8_41DE_A0E8B1CF4F06",
 "maps": [
  {
   "hfov": 2.03,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -98.23,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7924FCC_B438_A6D8_41E4_F69093B7B763_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -3.06
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showPopupPanoramaOverlay(this.popup_7F3248F5_6993_C38E_41D3_4522D27990C6, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'paddingTop':5,'rollOverIconWidth':20,'pressedBorderSize':0,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingRight':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'paddingBottom':5,'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_70ABF095_69F2_4389_41CC_F8DA354709AD, null, null, null, null, false)"
  }
 ],
 "data": {
  "label": "Info 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.32,
   "image": "this.AnimatedImageResource_7156B07B_69F2_4379_41BD_25B3B8C61FE1",
   "pitch": -1.56,
   "yaw": 51.09,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_7C5B85AA_6993_CD9A_41D6_C8AF84B9B365",
 "maps": [
  {
   "hfov": 5.32,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 51.09,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7924FCC_B438_A6D8_41E4_F69093B7B763_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -1.56
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A7B936D4_B438_66C8_41D7_BBFCC5890205, this.camera_B59D4BCA_BB3F_7AE4_41D1_F0C287993F14); this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.37,
   "image": "this.AnimatedImageResource_AC042C04_B4E8_6948_41C2_6927B2FD44EA",
   "pitch": -2.01,
   "yaw": 108.88,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A2DA6072_B428_B9C9_41B6_D11839B44198",
 "maps": [
  {
   "hfov": 2.37,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 108.88,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A786980F_B438_A958_41CC_E1CD8D96840B_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -2.01
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A7B90CA2_B438_6949_41D9_FECD4F9980FC, this.camera_ABFBCB84_BB3F_7B6C_41E4_9AC3C5FDB660); this.mainPlayList.set('selectedIndex', 16)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.64,
   "image": "this.AnimatedImageResource_AC059C04_B4E8_6948_41E4_56F47E7BBF9B",
   "pitch": -2.95,
   "yaw": -50.47,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A35C1410_B4EB_D948_41E6_18C6F4DAC824",
 "maps": [
  {
   "hfov": 1.64,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -50.47,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A786980F_B438_A958_41CC_E1CD8D96840B_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -2.95
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A7808C0B_B43F_A958_41AE_36DF5B301090, this.camera_ABC9BB7A_BB3F_7BA4_41C2_51C3C7FBD52F); this.mainPlayList.set('selectedIndex', 15)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.85,
   "image": "this.AnimatedImageResource_AC05FC05_B4E8_6948_41D2_EC9EF888A9C3",
   "pitch": -5.28,
   "yaw": -86.92,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_ACCA3952_B4EF_ABC8_41D4_26338191B273",
 "maps": [
  {
   "hfov": 2.85,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -86.92,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A786980F_B438_A958_41CC_E1CD8D96840B_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -5.28
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showPopupPanoramaOverlay(this.popup_7C97490D_698E_4299_41D9_6E94BBE9B2BB, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'paddingTop':5,'rollOverIconWidth':20,'pressedBorderSize':0,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingRight':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'paddingBottom':5,'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_70A51095_69F2_4389_41CF_C8E9C7CA50E1, null, null, null, null, false)"
  }
 ],
 "data": {
  "label": "Info 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.94,
   "image": "this.AnimatedImageResource_7157607B_69F2_4379_41DA_332DC89F446F",
   "pitch": -1.2,
   "yaw": -6.47,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_7C003304_698D_C68E_41B8_404F6ED61E29",
 "maps": [
  {
   "hfov": 3.94,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -6.47,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A786980F_B438_A958_41CC_E1CD8D96840B_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -1.2
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A7BEF0A3_B43F_B94F_41B9_9975BB394A37, this.camera_ABD96B70_BB3F_7BA4_41E4_FA3B73D46D26); this.mainPlayList.set('selectedIndex', 20)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.51,
   "image": "this.AnimatedImageResource_734CEF77_698E_5D77_4182_B64982A10E98",
   "pitch": -2.97,
   "yaw": 9.85,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_7C3BDA25_698D_C68B_41D3_17A48B868E55",
 "maps": [
  {
   "hfov": 3.51,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 9.85,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A786980F_B438_A958_41CC_E1CD8D96840B_0_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -2.97
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BBA93A6D_B418_A9DA_41DF_BE4E0F1A548B, this.camera_B465FA13_BB3F_6564_41E1_8DB4575A7D85); this.mainPlayList.set('selectedIndex', 9)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.77,
   "image": "this.AnimatedImageResource_A366E78D_B478_E75B_41E5_E9776281376B",
   "pitch": -4.07,
   "yaw": 98.78,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A68EC876_B478_A9C9_41E2_BAE7E67D3156",
 "maps": [
  {
   "hfov": 1.77,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 98.78,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BBB1C0DB_B418_7AFE_41E5_7573BE28445D_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -4.07
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7EA62FDF_7498_7BEB_41B0_E9C030E0910C, this.camera_B4730A08_BB3F_6563_41E1_33946EE9026F); this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.11,
   "image": "this.AnimatedImageResource_AC077C04_B4E8_6948_41D2_E5368FE9E709",
   "pitch": -7.25,
   "yaw": -162.1,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A37D6B06_B428_6F49_41C5_93A7BD353206",
 "maps": [
  {
   "hfov": 2.11,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -162.1,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BBB1C0DB_B418_7AFE_41E5_7573BE28445D_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -7.25
  }
 ]
},
{
 "textDecoration": "none",
 "fontFamily": "Montserrat",
 "propagateClick": false,
 "data": {
  "name": "title"
 },
 "id": "Label_0E9CEE5D_36F3_E64E_419C_5A94FA5D3CA1",
 "left": 76,
 "paddingLeft": 0,
 "fontColor": "#FFFFFF",
 "width": 450,
 "borderSize": 0,
 "minWidth": 1,
 "text": "Lake Tamblingan",
 "verticalAlign": "middle",
 "top": "0%",
 "height": 60,
 "fontSize": 31,
 "shadow": false,
 "fontStyle": "normal",
 "paddingTop": 0,
 "class": "Label",
 "minHeight": 1,
 "borderRadius": 0,
 "backgroundOpacity": 0,
 "paddingBottom": 0,
 "fontWeight": "normal",
 "horizontalAlign": "left",
 "paddingRight": 0
},
{
 "layout": "horizontal",
 "propagateClick": true,
 "scrollBarWidth": 10,
 "id": "Container_0542AAAA_3AA3_A6F3_41B2_0E208ADBBBE1",
 "scrollBarColor": "#000000",
 "right": "0%",
 "width": 1199,
 "children": [
  "this.DropDown_76BC1297_6992_47B3_41D5_DBE480A6EDAD",
  "this.DropDown_0561BA16_3AA3_A1D2_41C7_FDA0B6E9EE29",
  "this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312",
  "this.DropDown_05783A1F_3AA3_A1D2_41A6_E88282E5373B",
  "this.DropDown_057BFA20_3AA3_A1EE_41A9_8EE569D894A7",
  "this.Button_4CC5476E_5ABB_CC4E_41D1_A04ABE17DA89"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "minWidth": 1,
 "top": "0%",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "verticalAlign": "middle",
 "height": 60,
 "shadow": false,
 "gap": 3,
 "paddingTop": 0,
 "class": "Container",
 "minHeight": 1,
 "borderRadius": 0,
 "backgroundOpacity": 0,
 "paddingBottom": 0,
 "overflow": "scroll",
 "horizontalAlign": "right",
 "paddingRight": 15,
 "data": {
  "name": "-button set container"
 }
},
{
 "transparencyActive": true,
 "horizontalAlign": "center",
 "propagateClick": false,
 "id": "IconButton_7B212C50_3AA0_A1AF_41C5_F659ED22BD52",
 "paddingLeft": 0,
 "width": 44,
 "maxWidth": 101,
 "minWidth": 1,
 "borderSize": 0,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_7B212C50_3AA0_A1AF_41C5_F659ED22BD52.png",
 "mode": "push",
 "height": 44,
 "click": "this.setComponentVisibility(this.Image_7AC4751F_69BE_42BD_41D7_1E8A64921786, false, 0, null, null, false)",
 "shadow": false,
 "rollOverIconURL": "skin/IconButton_7B212C50_3AA0_A1AF_41C5_F659ED22BD52_rollover.png",
 "paddingTop": 0,
 "maxHeight": 101,
 "class": "IconButton",
 "minHeight": 1,
 "borderRadius": 0,
 "backgroundOpacity": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "paddingRight": 0,
 "data": {
  "name": "IconButton Info"
 }
},
{
 "transparencyActive": true,
 "horizontalAlign": "center",
 "propagateClick": false,
 "id": "IconButton_7B21CC51_3AA0_A251_41C9_1ABF5F74EDA0",
 "paddingLeft": 0,
 "width": 44,
 "maxWidth": 101,
 "minWidth": 1,
 "borderSize": 0,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_7B21CC51_3AA0_A251_41C9_1ABF5F74EDA0.png",
 "mode": "push",
 "height": 44,
 "click": "this.openLink('https://www.google.com/maps/place/Tamblingan+Lake/@-8.264869,115.0909019,17.25z/data=!4m14!1m7!3m6!1s0x2dd18602e5bdc255:0x29a7fd33142b9cd5!2sLake+Tamblingan!8m2!3d-8.2570585!4d115.0970101!16s%2Fg%2F121zjlvz!3m5!1s0x2dd18602d54356cb:0xa6a8ecfd68e16d6!8m2!3d-8.2647017!4d115.091894!16s%2Fg%2F11dxrt7504?entry=ttu&g_ep=EgoyMDI1MTAyNi4wIKXMDSoASAFQAw%3D%3D', '_blank')",
 "shadow": false,
 "rollOverIconURL": "skin/IconButton_7B21CC51_3AA0_A251_41C9_1ABF5F74EDA0_rollover.png",
 "paddingTop": 0,
 "maxHeight": 101,
 "class": "IconButton",
 "minHeight": 1,
 "borderRadius": 0,
 "backgroundOpacity": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "paddingRight": 0,
 "data": {
  "name": "IconButton Location"
 }
},
{
 "transparencyActive": true,
 "horizontalAlign": "center",
 "propagateClick": false,
 "id": "IconButton_797479D2_699F_C583_418F_562CA9204732",
 "paddingLeft": 0,
 "width": 44,
 "maxWidth": 101,
 "minWidth": 1,
 "borderSize": 0,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_797479D2_699F_C583_418F_562CA9204732.png",
 "mode": "push",
 "height": 44,
 "click": "this.openLink('https://youtu.be/N-i4pLG2M74', '_blank')",
 "shadow": false,
 "rollOverIconURL": "skin/IconButton_797479D2_699F_C583_418F_562CA9204732_rollover.png",
 "paddingTop": 0,
 "maxHeight": 101,
 "class": "IconButton",
 "minHeight": 1,
 "borderRadius": 0,
 "backgroundOpacity": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "paddingRight": 0,
 "data": {
  "name": "IconButton Video"
 }
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A365E78D_B478_E75B_41E5_E44E5D9F7736",
 "levels": [
  {
   "url": "media/panorama_BB48943D_B418_B9BB_41DE_BEF438B84FDE_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A365A78D_B478_E75B_41CF_375A2429FACA",
 "levels": [
  {
   "url": "media/panorama_BB48943D_B418_B9BB_41DE_BEF438B84FDE_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A366778D_B478_E75B_41DC_1F26C6EEC35E",
 "levels": [
  {
   "url": "media/panorama_BB48943D_B418_B9BB_41DE_BEF438B84FDE_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_97C86D68_B5E8_6BC7_41BC_BD9E10E16071",
 "levels": [
  {
   "url": "media/panorama_A7BEAAF4_B43F_EEC9_41D7_7EF99E7900B7_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_97C9CD68_B5E8_6BC7_41D3_B03BC8404A38",
 "levels": [
  {
   "url": "media/panorama_A7BEAAF4_B43F_EEC9_41D7_7EF99E7900B7_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_932FDA63_B418_69C9_41D7_1C17DF9EF292",
 "levels": [
  {
   "url": "media/panorama_A7BEAAF4_B43F_EEC9_41D7_7EF99E7900B7_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 22,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_716EF079_69F2_4379_41D8_92180A4B2B28",
 "levels": [
  {
   "url": "media/panorama_A7BEAAF4_B43F_EEC9_41D7_7EF99E7900B7_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 460,
   "height": 690
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_7231C8E8_69B7_C39C_41B6_A2247AB154AA",
 "levels": [
  {
   "url": "media/panorama_A7BEAAF4_B43F_EEC9_41D7_7EF99E7900B7_0_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 22,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_715BE07B_69F2_4379_41A0_BDF0E9717A95",
 "levels": [
  {
   "url": "media/panorama_95C99373_B439_DFC9_41CF_DBA77EFE762A_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 460,
   "height": 690
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 22,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_715A707B_69F2_4379_41D2_C6E4FCA931ED",
 "levels": [
  {
   "url": "media/panorama_95C99373_B439_DFC9_41CF_DBA77EFE762A_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 460,
   "height": 690
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 22,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_715A107B_69F2_4379_41D8_0CDF87F87B53",
 "levels": [
  {
   "url": "media/panorama_95C99373_B439_DFC9_41CF_DBA77EFE762A_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 460,
   "height": 690
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A7B877BE_B428_A6B9_41CC_9CDE64AFC056",
 "levels": [
  {
   "url": "media/panorama_BBB08BDF_B418_EEF6_41B4_912FC2FCEF8E_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A364578C_B478_E759_41DA_D958D3157677",
 "levels": [
  {
   "url": "media/panorama_BB4975DB_B418_FAFF_41E0_72C5A527492C_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_AC054C05_B4E8_6948_41C3_37EE2700BB2C",
 "levels": [
  {
   "url": "media/panorama_A7B96437_B438_B9B7_41D3_8359BF07DA8B_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_AC029C05_B4E8_6948_41DA_B7EC27D1DAC2",
 "levels": [
  {
   "url": "media/panorama_A7B96437_B438_B9B7_41D3_8359BF07DA8B_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_AC02FC05_B4E8_6948_41E4_B055B495AD34",
 "levels": [
  {
   "url": "media/panorama_A7B96437_B438_B9B7_41D3_8359BF07DA8B_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_7A0B641E_7498_4C6D_41C8_BFC9042E3D94",
 "levels": [
  {
   "url": "media/panorama_7EC7D790_7498_4C75_41CB_BD28A22679B2_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_7BD0AF99_7498_7C77_41B7_8C2C9ADBCCC8",
 "levels": [
  {
   "url": "media/panorama_7EC7D790_7498_4C75_41CB_BD28A22679B2_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A7B3CC8A_B429_E959_41D8_8338BAFAAE33",
 "levels": [
  {
   "url": "media/panorama_7EA21DB9_7498_BFB7_41B6_6780B5D32237_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A7B38C8B_B429_E95F_41E2_E85BAA3A5AB0",
 "levels": [
  {
   "url": "media/panorama_7EA21DB9_7498_BFB7_41B6_6780B5D32237_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_97F71D70_B5E8_6BC7_41D6_AC529A744B7F",
 "levels": [
  {
   "url": "media/panorama_A78661E2_B438_7AC9_41D6_BADE776856B8_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_97F48D72_B5E8_6BCB_41C5_10592E26DEF2",
 "levels": [
  {
   "url": "media/panorama_A78661E2_B438_7AC9_41D6_BADE776856B8_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 22,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_7151507B_69F2_4379_41BE_365DFAE0D0E2",
 "levels": [
  {
   "url": "media/panorama_A78661E2_B438_7AC9_41D6_BADE776856B8_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 460,
   "height": 690
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_97F4CD72_B5E8_6BCB_41B3_42AD090FEEA7",
 "levels": [
  {
   "url": "media/panorama_A7B90CA2_B438_6949_41D9_FECD4F9980FC_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_97F42D73_B5E8_6BC9_41CD_C967EAE46FD0",
 "levels": [
  {
   "url": "media/panorama_A7B90CA2_B438_6949_41D9_FECD4F9980FC_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_76DBEE9A_698E_7FBF_41D1_889DC22BDAC5",
 "levels": [
  {
   "url": "media/panorama_A7B90CA2_B438_6949_41D9_FECD4F9980FC_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_76DB5E9A_698E_7FBF_41D8_8A91B5F1D9A0",
 "levels": [
  {
   "url": "media/panorama_A7B90CA2_B438_6949_41D9_FECD4F9980FC_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_76DB0E9A_698E_7FBF_41C6_8EDE209F4B5B",
 "levels": [
  {
   "url": "media/panorama_A7B90CA2_B438_6949_41D9_FECD4F9980FC_0_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_BB4AF0D6_B428_5AC9_41D3_CC222BEDDA00",
 "levels": [
  {
   "url": "media/panorama_7ECAB660_7498_4CD6_41D4_1A5A06463D23_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_97CC6D64_B5E8_6BCF_41CA_46FE4FB9302A",
 "levels": [
  {
   "url": "media/panorama_7ECAB660_7498_4CD6_41D4_1A5A06463D23_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 22,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_716B0079_69F2_4379_41C8_3D3544B86FFF",
 "levels": [
  {
   "url": "media/panorama_7ECAB660_7498_4CD6_41D4_1A5A06463D23_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 460,
   "height": 690
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_97F30D76_B5E8_6BCB_41C1_E41E7202736B",
 "levels": [
  {
   "url": "media/panorama_A7B91B96_B438_EF49_41D0_EA4C08E176A7_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_C79AC3A4_DE75_44BC_41E7_C7025012A0CB",
 "levels": [
  {
   "url": "media/panorama_A7B91B96_B438_EF49_41D0_EA4C08E176A7_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_C79B53A4_DE75_44BC_41CD_BCDCCE79D14E",
 "levels": [
  {
   "url": "media/panorama_A7B91B96_B438_EF49_41D0_EA4C08E176A7_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_ACFDFBFD_B4E8_6EBB_41D7_19FAFBF46EF3",
 "levels": [
  {
   "url": "media/panorama_7FD5281A_7498_4475_41D5_125CE4CC7753_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_C206F8A4_DE55_44BC_41C0_F00C4B5798C4",
 "levels": [
  {
   "url": "media/panorama_7FD5281A_7498_4475_41D5_125CE4CC7753_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_97C97D69_B5E8_6BD9_41DA_E005778B6270",
 "levels": [
  {
   "url": "media/panorama_A7808C0B_B43F_A958_41AE_36DF5B301090_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_97F6ED69_B5E8_6BD9_41E6_67D485C3A4A2",
 "levels": [
  {
   "url": "media/panorama_A7808C0B_B43F_A958_41AE_36DF5B301090_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_97F65D69_B5E8_6BDC_41E1_E45A44D11723",
 "levels": [
  {
   "url": "media/panorama_A7808C0B_B43F_A958_41AE_36DF5B301090_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_76D61E96_698E_7FB7_41B9_0795A825A540",
 "levels": [
  {
   "url": "media/panorama_A7808C0B_B43F_A958_41AE_36DF5B301090_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_932A9A65_B418_69C9_41E1_6692E6D1AA0A",
 "levels": [
  {
   "url": "media/panorama_A7808C0B_B43F_A958_41AE_36DF5B301090_0_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_932A0A69_B418_69D9_41E1_80E8E5095551",
 "levels": [
  {
   "url": "media/panorama_A7808C0B_B43F_A958_41AE_36DF5B301090_0_HS_5_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 22,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_73484F77_698E_5D77_41D7_5E680546D199",
 "levels": [
  {
   "url": "media/panorama_A7808C0B_B43F_A958_41AE_36DF5B301090_0_HS_6_0.png",
   "class": "ImageResourceLevel",
   "width": 460,
   "height": 690
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_AC04CC04_B4E8_6948_41D9_065D53F66B86",
 "levels": [
  {
   "url": "media/panorama_A7B936D4_B438_66C8_41D7_BBFCC5890205_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_73548FC7_6992_3D97_41D5_093A52540FC2",
 "levels": [
  {
   "url": "media/panorama_A7B936D4_B438_66C8_41D7_BBFCC5890205_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_97C80D68_B5E8_6BC7_41D4_D38C8C51F46C",
 "levels": [
  {
   "url": "media/panorama_A0366EF2_B43F_E6C9_41D0_B451038B8996_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 22,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_716F2079_69F2_4379_41D3_18A6E3D846EF",
 "levels": [
  {
   "url": "media/panorama_A0366EF2_B43F_E6C9_41D0_B451038B8996_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 460,
   "height": 690
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_723628E7_69B7_C394_41D6_EC7CA91AC453",
 "levels": [
  {
   "url": "media/panorama_A0366EF2_B43F_E6C9_41D0_B451038B8996_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_723648E7_69B7_C394_41B7_C0EBCED42250",
 "levels": [
  {
   "url": "media/panorama_A0366EF2_B43F_E6C9_41D0_B451038B8996_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_97C91D69_B5E8_6BD9_41D7_F2633C515509",
 "levels": [
  {
   "url": "media/panorama_A78285F6_B43F_DAC9_41D5_DC8F7DA52DC0_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_932F7A63_B418_69C9_41E3_69302B9E54B8",
 "levels": [
  {
   "url": "media/panorama_A78285F6_B43F_DAC9_41D5_DC8F7DA52DC0_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 22,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_716D007B_69F2_4379_41DA_4B06EDC52540",
 "levels": [
  {
   "url": "media/panorama_A78285F6_B43F_DAC9_41D5_DC8F7DA52DC0_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 460,
   "height": 690
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 22,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_7154107B_69F2_4379_4174_709A24C7EEE6",
 "levels": [
  {
   "url": "media/panorama_95EBD687_B439_F94A_41D8_B3A956CC1C1A_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 460,
   "height": 690
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 22,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_7154B07B_69F2_4379_419C_83A1101993B7",
 "levels": [
  {
   "url": "media/panorama_95EBD687_B439_F94A_41D8_B3A956CC1C1A_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 460,
   "height": 690
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 22,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_715B607B_69F2_4379_41C4_5BBC78181461",
 "levels": [
  {
   "url": "media/panorama_95EBD687_B439_F94A_41D8_B3A956CC1C1A_0_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 460,
   "height": 690
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A364F78C_B478_E759_41AE_07CEFACDB860",
 "levels": [
  {
   "url": "media/panorama_BBA93A6D_B418_A9DA_41DF_BE4E0F1A548B_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A364A78D_B478_E75B_416D_B1A16796F7CE",
 "levels": [
  {
   "url": "media/panorama_BBA93A6D_B418_A9DA_41DF_BE4E0F1A548B_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A365178D_B478_E75B_41D4_7B208A44D4C7",
 "levels": [
  {
   "url": "media/panorama_BBA93A6D_B418_A9DA_41DF_BE4E0F1A548B_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 22,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_7154607B_69F2_4379_41C4_F9D411C6D314",
 "levels": [
  {
   "url": "media/panorama_95C2995D_B439_EBFE_41E4_BB7C848E21F6_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 460,
   "height": 690
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A364378C_B478_E759_41DF_DE749BECCD17",
 "levels": [
  {
   "url": "media/panorama_BB48DE80_B418_E949_41D5_AC51A1BC4CDE_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A72E4E60_B428_A9CA_41DF_545D82FF45FD",
 "levels": [
  {
   "url": "media/panorama_7EA21F0F_7498_5C6A_41D8_19929C3AC58B_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A5C671DB_B429_DAFE_41BB_C2A358399F0E",
 "levels": [
  {
   "url": "media/panorama_7EA21F0F_7498_5C6A_41D8_19929C3AC58B_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A1DC749A_B418_D979_41D9_ED98925917D2",
 "levels": [
  {
   "url": "media/panorama_7EA21F0F_7498_5C6A_41D8_19929C3AC58B_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_C76EE39F_DE75_448B_41C1_475CC1A03EFB",
 "levels": [
  {
   "url": "media/panorama_7EA21F0F_7498_5C6A_41D8_19929C3AC58B_0_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_7BEDE7E3_7498_4BDB_419C_9886E8AA8023",
 "levels": [
  {
   "url": "media/panorama_7EA62FDF_7498_7BEB_41B0_E9C030E0910C_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_7A0B041E_7498_4C6D_41CD_8DDE01B61CEA",
 "levels": [
  {
   "url": "media/panorama_7EA62FDF_7498_7BEB_41B0_E9C030E0910C_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_ACFBAC00_B4E8_6948_41CB_FA697DAEC034",
 "levels": [
  {
   "url": "media/panorama_7EA62FDF_7498_7BEB_41B0_E9C030E0910C_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_CCBC2E67_DDBB_BFBB_41EB_85702C214055",
 "levels": [
  {
   "url": "media/panorama_7EA62FDF_7498_7BEB_41B0_E9C030E0910C_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_73451F77_698E_5D77_41DA_026FF9077A40",
 "levels": [
  {
   "url": "media/panorama_A7BEF0A3_B43F_B94F_41B9_9975BB394A37_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 22,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_716C507B_69F2_4379_4167_32FC0E92322D",
 "levels": [
  {
   "url": "media/panorama_A7BEF0A3_B43F_B94F_41B9_9975BB394A37_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 460,
   "height": 690
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_73467F77_698E_5D77_41CB_ED6E07C5EAFF",
 "levels": [
  {
   "url": "media/panorama_A7BEF0A3_B43F_B94F_41B9_9975BB394A37_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_76D56E8D_698E_7F95_41D9_38A4274ED816",
 "levels": [
  {
   "url": "media/panorama_A7BEF0A3_B43F_B94F_41B9_9975BB394A37_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_97F21D74_B5E8_6BCF_41E0_7E04824374CF",
 "levels": [
  {
   "url": "media/panorama_A7924FCC_B438_A6D8_41E4_F69093B7B763_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_97F39D75_B5E8_6BC9_41D3_AE93AD181419",
 "levels": [
  {
   "url": "media/panorama_A7924FCC_B438_A6D8_41E4_F69093B7B763_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 22,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_7156B07B_69F2_4379_41BD_25B3B8C61FE1",
 "levels": [
  {
   "url": "media/panorama_A7924FCC_B438_A6D8_41E4_F69093B7B763_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 460,
   "height": 690
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_AC042C04_B4E8_6948_41C2_6927B2FD44EA",
 "levels": [
  {
   "url": "media/panorama_A786980F_B438_A958_41CC_E1CD8D96840B_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_AC059C04_B4E8_6948_41E4_56F47E7BBF9B",
 "levels": [
  {
   "url": "media/panorama_A786980F_B438_A958_41CC_E1CD8D96840B_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_AC05FC05_B4E8_6948_41D2_EC9EF888A9C3",
 "levels": [
  {
   "url": "media/panorama_A786980F_B438_A958_41CC_E1CD8D96840B_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 22,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_7157607B_69F2_4379_41DA_332DC89F446F",
 "levels": [
  {
   "url": "media/panorama_A786980F_B438_A958_41CC_E1CD8D96840B_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 460,
   "height": 690
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_734CEF77_698E_5D77_4182_B64982A10E98",
 "levels": [
  {
   "url": "media/panorama_A786980F_B438_A958_41CC_E1CD8D96840B_0_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A366E78D_B478_E75B_41E5_E9776281376B",
 "levels": [
  {
   "url": "media/panorama_BBB1C0DB_B418_7AFE_41E5_7573BE28445D_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_AC077C04_B4E8_6948_41D2_E5368FE9E709",
 "levels": [
  {
   "url": "media/panorama_BBB1C0DB_B418_7AFE_41E5_7573BE28445D_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 600
  }
 ]
},
{
 "textDecoration": "none",
 "fontFamily": "Montserrat",
 "backgroundColorRatios": [
  0
 ],
 "arrowColor": "#FFFFFF",
 "popUpPaddingLeft": 15,
 "id": "DropDown_76BC1297_6992_47B3_41D5_DBE480A6EDAD",
 "popUpBackgroundColor": "#F7931E",
 "pressedBackgroundColor": [
  "#CE6700"
 ],
 "propagateClick": false,
 "width": 116,
 "rollOverPopUpBackgroundColor": "#CE6700",
 "paddingLeft": 15,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundColor": [
  "#CE6700"
 ],
 "borderSize": 0,
 "popUpBackgroundOpacity": 1,
 "selectedPopUpBackgroundColor": "#CE6700",
 "minWidth": 1,
 "popUpShadow": false,
 "popUpGap": 2,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "popUpPaddingBottom": 10,
 "playList": "this.DropDown_76BC1297_6992_47B3_41D5_DBE480A6EDAD_playlist",
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingBottom": 0,
 "data": {
  "name": "All"
 },
 "popUpPaddingTop": 10,
 "backgroundColor": [
  "#F7931E"
 ],
 "fontSize": 12,
 "label": "All",
 "height": "100%",
 "shadow": false,
 "gap": 0,
 "fontStyle": "normal",
 "popUpBorderRadius": 0,
 "popUpShadowOpacity": 0,
 "class": "DropDown",
 "popUpShadowBlurRadius": 6,
 "popUpFontColor": "#FFFFFF",
 "backgroundOpacity": 1,
 "paddingRight": 15,
 "minHeight": 1,
 "borderRadius": 0,
 "popUpShadowColor": "#000000",
 "paddingTop": 0,
 "fontWeight": "bold",
 "arrowBeforeLabel": false,
 "popUpShadowSpread": 1
},
{
 "textDecoration": "none",
 "fontFamily": "Montserrat",
 "backgroundColorRatios": [
  0
 ],
 "arrowColor": "#FFFFFF",
 "popUpPaddingLeft": 15,
 "id": "DropDown_0561BA16_3AA3_A1D2_41C7_FDA0B6E9EE29",
 "popUpBackgroundColor": "#F7931E",
 "pressedBackgroundColor": [
  "#CE6700"
 ],
 "propagateClick": false,
 "width": 116,
 "rollOverPopUpBackgroundColor": "#CE6700",
 "paddingLeft": 15,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundColor": [
  "#CE6700"
 ],
 "borderSize": 0,
 "popUpBackgroundOpacity": 1,
 "selectedPopUpBackgroundColor": "#CE6700",
 "minWidth": 1,
 "popUpShadow": false,
 "popUpGap": 2,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "popUpPaddingBottom": 10,
 "playList": "this.DropDown_0561BA16_3AA3_A1D2_41C7_FDA0B6E9EE29_playlist",
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingBottom": 0,
 "data": {
  "name": "Drone View"
 },
 "popUpPaddingTop": 10,
 "backgroundColor": [
  "#F7931E"
 ],
 "fontSize": 12,
 "label": "Drone View",
 "height": "100%",
 "shadow": false,
 "gap": 0,
 "fontStyle": "normal",
 "popUpBorderRadius": 0,
 "popUpShadowOpacity": 0,
 "class": "DropDown",
 "popUpShadowBlurRadius": 6,
 "popUpFontColor": "#FFFFFF",
 "backgroundOpacity": 1,
 "paddingRight": 15,
 "minHeight": 1,
 "borderRadius": 0,
 "popUpShadowColor": "#000000",
 "paddingTop": 0,
 "fontWeight": "bold",
 "arrowBeforeLabel": false,
 "popUpShadowSpread": 1
},
{
 "textDecoration": "none",
 "fontFamily": "Montserrat",
 "backgroundColorRatios": [
  0
 ],
 "arrowColor": "#FFFFFF",
 "popUpPaddingLeft": 15,
 "id": "DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312",
 "popUpBackgroundColor": "#F7931E",
 "pressedBackgroundColor": [
  "#CE6700"
 ],
 "propagateClick": false,
 "width": 96,
 "rollOverPopUpBackgroundColor": "#CE6700",
 "paddingLeft": 15,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundColor": [
  "#CE6700"
 ],
 "borderSize": 0,
 "popUpBackgroundOpacity": 1,
 "selectedPopUpBackgroundColor": "#CE6700",
 "minWidth": 1,
 "popUpShadow": false,
 "popUpGap": 2,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "popUpPaddingBottom": 10,
 "playList": "this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist",
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingBottom": 0,
 "data": {
  "name": "DropDown 2"
 },
 "popUpPaddingTop": 10,
 "backgroundColor": [
  "#F7931E"
 ],
 "fontSize": 12,
 "label": "Camping Area",
 "height": "100%",
 "shadow": false,
 "gap": 0,
 "fontStyle": "normal",
 "popUpBorderRadius": 5,
 "popUpShadowOpacity": 0,
 "class": "DropDown",
 "popUpShadowBlurRadius": 6,
 "popUpFontColor": "#FFFFFF",
 "backgroundOpacity": 1,
 "paddingRight": 15,
 "minHeight": 1,
 "borderRadius": 0,
 "popUpShadowColor": "#000000",
 "paddingTop": 0,
 "fontWeight": "bold",
 "arrowBeforeLabel": false,
 "popUpShadowSpread": 1
},
{
 "textDecoration": "none",
 "fontFamily": "Montserrat",
 "backgroundColorRatios": [
  0
 ],
 "arrowColor": "#FFFFFF",
 "popUpPaddingLeft": 15,
 "id": "DropDown_05783A1F_3AA3_A1D2_41A6_E88282E5373B",
 "popUpBackgroundColor": "#F7931E",
 "pressedBackgroundColor": [
  "#CE6700"
 ],
 "propagateClick": false,
 "width": 114,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "rollOverPopUpBackgroundColor": "#CE6700",
 "paddingLeft": 15,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundColor": [
  "#CE6700"
 ],
 "borderSize": 0,
 "popUpBackgroundOpacity": 1,
 "selectedPopUpBackgroundColor": "#CE6700",
 "minWidth": 1,
 "popUpShadow": false,
 "popUpGap": 2,
 "backgroundColorDirection": "vertical",
 "popUpPaddingBottom": 10,
 "playList": "this.DropDown_05783A1F_3AA3_A1D2_41A6_E88282E5373B_playlist",
 "pressedBackgroundColorRatios": [
  0
 ],
 "data": {
  "name": "DropDown 3"
 },
 "height": 60,
 "popUpPaddingTop": 10,
 "fontSize": 12,
 "label": "The Temple",
 "backgroundColor": [
  "#F7931E"
 ],
 "shadow": false,
 "gap": 0,
 "fontStyle": "normal",
 "popUpBorderRadius": 0,
 "popUpShadowOpacity": 0,
 "paddingTop": 0,
 "popUpShadowBlurRadius": 6,
 "popUpFontColor": "#FFFFFF",
 "class": "DropDown",
 "paddingRight": 15,
 "minHeight": 1,
 "borderRadius": 0,
 "backgroundOpacity": 1,
 "paddingBottom": 0,
 "fontWeight": "bold",
 "arrowBeforeLabel": false,
 "popUpShadowColor": "#000000",
 "popUpShadowSpread": 1
},
{
 "textDecoration": "none",
 "fontFamily": "Montserrat",
 "backgroundColorRatios": [
  0
 ],
 "arrowColor": "#FFFFFF",
 "popUpPaddingLeft": 15,
 "id": "DropDown_057BFA20_3AA3_A1EE_41A9_8EE569D894A7",
 "popUpBackgroundColor": "#F7931E",
 "pressedBackgroundColor": [
  "#CE6700"
 ],
 "propagateClick": false,
 "width": 130,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "rollOverPopUpBackgroundColor": "#CE6700",
 "paddingLeft": 15,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundColor": [
  "#CE6700"
 ],
 "borderSize": 0,
 "popUpBackgroundOpacity": 1,
 "selectedPopUpBackgroundColor": "#CE6700",
 "minWidth": 1,
 "popUpShadow": false,
 "popUpGap": 2,
 "backgroundColorDirection": "vertical",
 "popUpPaddingBottom": 10,
 "playList": "this.DropDown_057BFA20_3AA3_A1EE_41A9_8EE569D894A7_playlist",
 "pressedBackgroundColorRatios": [
  0
 ],
 "data": {
  "name": "DropDown 4"
 },
 "height": 60,
 "popUpPaddingTop": 10,
 "fontSize": 12,
 "label": "The Road To The Lake",
 "backgroundColor": [
  "#F7931E"
 ],
 "shadow": false,
 "gap": 0,
 "fontStyle": "normal",
 "popUpBorderRadius": 0,
 "popUpShadowOpacity": 0,
 "paddingTop": 0,
 "popUpShadowBlurRadius": 6,
 "popUpFontColor": "#FFFFFF",
 "class": "DropDown",
 "paddingRight": 15,
 "minHeight": 1,
 "borderRadius": 0,
 "backgroundOpacity": 1,
 "paddingBottom": 0,
 "fontWeight": "bold",
 "arrowBeforeLabel": false,
 "popUpShadowColor": "#000000",
 "popUpShadowSpread": 1
},
{
 "textDecoration": "none",
 "layout": "horizontal",
 "horizontalAlign": "center",
 "backgroundColorRatios": [
  0
 ],
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_4CC5476E_5ABB_CC4E_41D1_A04ABE17DA89",
 "propagateClick": false,
 "width": 60,
 "data": {
  "name": "Button Settings"
 },
 "shadowColor": "#000000",
 "fontFamily": "Arial",
 "paddingLeft": 0,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "shadowSpread": 1,
 "minWidth": 1,
 "iconHeight": 17,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "rollOverBackgroundOpacity": 1,
 "height": 60,
 "mode": "toggle",
 "fontSize": 12,
 "backgroundColor": [
  "#F7931E"
 ],
 "shadowBlurRadius": 6,
 "shadow": false,
 "gap": 5,
 "iconBeforeLabel": true,
 "fontStyle": "normal",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#CE6700"
 ],
 "click": "if(!this.Container_0A760F11_3BA1_BFAE_41CD_32268FCAF8B4.get('visible')){ this.setComponentVisibility(this.Container_0A760F11_3BA1_BFAE_41CD_32268FCAF8B4, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_0A760F11_3BA1_BFAE_41CD_32268FCAF8B4, false, 0, null, null, false) }",
 "class": "Button",
 "paddingRight": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "pressedIconURL": "skin/Button_4CC5476E_5ABB_CC4E_41D1_A04ABE17DA89_pressed.png",
 "backgroundOpacity": 1,
 "paddingBottom": 0,
 "iconWidth": 17,
 "cursor": "hand",
 "iconURL": "skin/Button_4CC5476E_5ABB_CC4E_41D1_A04ABE17DA89.png",
 "fontWeight": "normal"
}],
 "width": "100%",
 "data": {
  "name": "Player468"
 }
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
