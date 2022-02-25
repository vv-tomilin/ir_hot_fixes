<div style="width:100%;height:100%" xmlns="http://www.w3.org/1999/xhtml">
  <style>&#xd;
    .modal-overlay{& #xd;
    opacity: 0;&#xd;
    visibility: hidden;&#xd;
    position:fixed;&#xd;
    top:0;&#xd;
    left:0;&#xd;
    height:100%;&#xd;
    width:100%;&#xd;
    background-color: rgba(0,0,0,0.5);&#xd;
    z-index: 20;&#xd;
            }&#xd;
    .modal-info{& #xd;
    opacity: 0;&#xd;
    visibility: hidden;&#xd;
    position:fixed;&#xd;
    top:50%;&#xd;
    left:50%;&#xd;
    width:100%;&#xd;
    max-width: 500px;&#xd;
    height:100%;&#xd;
    max-height:400px;&#xd;
    transform: translate(-50%,-50%);&#xd;
    z-index: 30;&#xd;
    background-color: rgb(31,31,31);&#xd;
    border-radius: 10px;&#xd;
    display:flex;&#xd;
    justify-content: space-around;&#xd;
    flex-direction: column;&#xd;
    color:white;&#xd;
    text-align: left;&#xd;
    padding:2rem;&#xd;
            }&#xd;
    .active{& #xd;
    opacity: 1;&#xd;
    visibility: visible;&#xd;
            }&#xd;
    #modal-trigger{& #xd;
    position:absolute;&#xd;
    top:75%;&#xd;
    left:10%;&#xd;
    border-radius:5px;&#xd;
    background-color:rgb(75,94,108);&#xd;
    color:white;  &#xd;
    boder-style:none   &#xd;
        }&#xd;
    .modal-help{& #xd;
    width:30%;       &#xd;
        }&#xd;
  </style>
  <button id="modal-trigger">Подробнее...</button>
  <div class="modal-overlay" id="modal-overlay" />
  <div class="modal-info" id="modal-info">
    <div id="modal-info-text" />
    <button class="modal-button modal-help" id="info-close">Закрыть</button>
  </div>
  <script>&#xd;
    document.getElementById('modal-trigger').addEventListener('click', function(e){& #xd;
    parent.document.getElementById('modal-info').classList.add('active')&#xd;
    parent.document.getElementById('modal-overlay').classList.add('active') &#xd;
        })&#xd;
    document.getElementById('info-close').addEventListener('click', function(e){& #xd;
    parent.document.getElementById('modal-info').classList.remove('active')&#xd;
    parent.document.getElementById('modal-overlay').classList.remove('active') &#xd;
        })&#xd;
    document.getElementById('modal-overlay').addEventListener('click', function(e){& #xd;
    parent.document.getElementById('modal-info').classList.remove('active')&#xd;
    parent.document.getElementById('modal-overlay').classList.remove('active') &#xd;
        })&#xd;
    &#xd;
  </script>
</div>