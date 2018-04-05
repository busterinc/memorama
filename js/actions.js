var iTiempoTranscurrido = PuntosObtenidos = 0, iTiempoLimite = 70, objPrimero;
var blnJuegoFinalizado = false;
var scr = 0;
var tmr = 0;
var avtr = "";
var flag_avatar = false;

$(document).ready(function()
	{
			var strCuadros = [1,2,3,4,5,6], iRepeticiones = 4;

			$('ul li').live('click',function()
				{
						if(!blnJuegoFinalizado && $(this).css('opacity')!=0)
							{
									var strImagen = 'img/snacks/' + $(this).attr('rel') + '.png';

									if(objPrimero==undefined)
										{
												objPrimero=$(this);
												objPrimero.stop(true,true).animate({opacity:.9}).css('background-image','url(' + strImagen+')');
										}
									else
										{
												var objSegundo=$(this);
												objSegundo.stop(true,true).animate({opacity:.9}).css('background-image','url(' + strImagen + ')');


												if( objPrimero.index() != objSegundo.index() )
													{
															if(objPrimero.attr('rel')==objSegundo.attr('rel'))
																{
																		iPuntosObtenidos++;

																		$(objPrimero).stop(true,true).animate({opacity: 1}).delay(700).animate({opacity: 0});
																		$(objSegundo).stop(true,true).animate({opacity: 1}).delay(700).animate({opacity: 0});

																		if(iPuntosObtenidos==$('ul li').length/2) $.fntFinalizarJuego();
																}
															else
																{
																		$(objPrimero).stop(true,true).animate({opacity: 1},1000,function(){$(this).css('background-image','none');});
																		$(objSegundo).stop(true,true).animate({opacity: 1},1000,function(){$(this).css('background-image','none');});
																}
													}
												else
													$(this).stop(true,true).animate({opacity: 1},1000,function(){$(this).html('&nbsp;');});

												objPrimero=undefined;
										}
							}
						else
							{}
				});
			$.fntTiempo=function()
				{
						if( !blnJuegoFinalizado )
						{
								if( iTiempoTranscurrido >= iTiempoLimite )
									$.fntFinalizarJuego();

								else
									{
											setTimeout('$.fntTiempo()',1000);
											$('#divContador').find('p').html('<strong>Score: </strong>' + iPuntosObtenidos + ' &bull; <strong>Time: </strong>' + ( iTiempoLimite - iTiempoTranscurrido) + ' s');
											iTiempoTranscurrido++;

											if( iPuntosObtenidos >= 12 )
												document.getElementById("canvas").style.display = "block";
											else
												document.getElementById("canvas").style.display = "none";

											BestScore();
											scr = iPuntosObtenidos + 1;
											tmr = (70 - ( iTiempoLimite - iTiempoTranscurrido ) );
									}
						}
				};
			$.fntFinalizarJuego=function()
				{
						$('#divContenedor ul').html('');
						blnJuegoFinalizado = true;
						$('#divContador').find('p').html('<strong>Score: </strong>' + iPuntosObtenidos + ' &bull; <strong>Time: </strong>' + iTiempoTranscurrido + ' s');

						if( iPuntosObtenidos >= 12 )
							document.getElementById("canvas").style.display = "block";
						else
							document.getElementById("canvas").style.display = "none";

						BestScore();
						scr = iPuntosObtenidos + 1;
						tmr = (70 - ( iTiempoLimite - iTiempoTranscurrido ) );

						$('#divInicio').stop(true,true).fadeIn(1500,function()
							{
									$('ul li').stop(true,true).css('opacity',1).html('&nbsp;');
							});
				};
			$.fntIniciarJuego = function()
				{
						$('#divContador').find('p').html('Loading...');

						for( var iCont = 0; iCont < iRepeticiones; iCont++ )
							{
									strCuadros=strCuadros.sort(function()
										{
												return Math.random() - 0.5;
										});

									for(var iCuadros = 0; iCuadros < strCuadros.length; iCuadros++)
										$('#divContenedor ul').append('<li rel="' + strCuadros[iCuadros] + '">&nbsp;</li>');
							}

						iTiempoTranscurrido = iPuntosObtenidos = 0, objPrimero = undefined;

						$('#divInicio').stop(true,true).fadeOut(1500,function()
							{
									blnJuegoFinalizado = false;
									$.fntTiempo();
							});
				};
			$('#btnJugar').on('click',function()
				{
						$.fntIniciarJuego();
				});
			$('#btnCreditos').on('click',function()
				{
						var objCapa=$('#divCreditos');

						if(objCapa.is(':visible'))
							objCapa.fadeOut();
						else
							objCapa.fadeIn();
				});
	});

function BestScore()
	{
			if (typeof(Storage) !== "undefined")
				{
					var avata = document.getElementById("avatar").value;

					if( scr >= localStorage.getItem("score") && tmr < localStorage.getItem("time") )
						{
								localStorage.setItem("avatar", avata);
								localStorage.setItem("score", scr);
								localStorage.setItem("time", tmr);
								document.getElementById("avatar_id").innerHTML = "Avatar: " + localStorage.getItem("avatar");
								document.getElementById("best_score").innerHTML = "Best Score: " + localStorage.getItem("score");
								document.getElementById("best_time").innerHTML = "Best Time: " + localStorage.getItem("time") + " s";
						}
				}
			else
				console.log("Sorry, your browser does not support Web Storage...");
	}

function validAvatar()
	{
			var AVATAR = document.getElementById("avatar").value;
			var message = document.getElementById("err_avatar");
      var show = document.getElementById("shw_err_avatar");

			console.log(AVATAR);

			if( AVATAR == null || AVATAR.length == 0 || /^\s+$/.test(AVATAR) || AVATAR == "" || AVATAR == " " )
            {
                show.style.display = "block";
                message.innerHTML = "Error: Ingrese un AVATAR válido";
                flag_avatar = false;
                document.getElementById("avatar").style.background = "#FFF";
								document.getElementById("btnJugar").disabled = true;
            }
        else if (AVATAR.length < 3)
            {
                show.style.display = "block";
                message.innerHTML = "Error: Su AVATAR debe ser de al menos 3 caracteres";
                flag_avatar = false;
                document.getElementById("avatar").style.background = "#FFF";
								document.getElementById("btnJugar").disabled = true;
            }
				else if (AVATAR.length > 15)
            {
                show.style.display = "block";
                message.innerHTML = "Error: Su AVATAR debe contener más de 15 caracteres";
                flag_avatar = false;
                document.getElementById("avatar").style.background = "#FFF";
								document.getElementById("btnJugar").disabled = true;
            }
        else if ( /^[1-9]/.test(AVATAR) )
            {
                show.style.display = "block";
                message.innerHTML = "Error: El campo AVATAR no debe contener Números";
                flag_avatar = false;
                document.getElementById("avatar").style.background = "#FFF";
								document.getElementById("btnJugar").disabled = true;
            }
				else if ( /^[@]/.test(AVATAR) == false)
            {
                show.style.display = "block";
                message.innerHTML = "Error: El campo AVATAR debe contener @";
                flag_avatar = false;
                document.getElementById("avatar").style.background = "#FFF";
								document.getElementById("btnJugar").disabled = true;
            }
        else
            {
                show.style.display = "none";
                message.innerHTML = " ";
                document.getElementById("avatar").style.background = "cornsilk";
                flag_avatar = true;
								document.getElementById("btnJugar").disabled = false;
            }
	}
