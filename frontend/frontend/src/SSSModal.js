function SSSModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="modal d-block" tabIndex="-1" style={{background:"rgba(0,0,0,0.3)"}}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Sıkça Sorulan Sorular</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p>
              <b>Bu sistem ne yapar?</b><br />
              Yapay zeka ile beyin BT görüntülerinden inme tespiti ve tipi tahmini sağlar.
            </p>
            <p>
              <b>Arayüzü nasıl kullanabilirim?</b><br />
              Ana sayfada hasta bilgilerini ve BT görüntüsünü yükleyip <b>Analiz Et</b> butonuna basarak analiz başlatabilirsiniz.
            </p>
            <p>
              <b>Kayıtlı analizlere ve geçmişe nasıl ulaşabilirim?</b><br />
              Üst menüden <b>Kayıtlı Analiz Listesi</b> butonuna tıklayarak geçmiş hastalara ait bilgileri tablo halinde görüntüleyebilirsiniz.
            </p>
            <p>
              <b>Kayıtları nasıl filtreleyebilirim?</b><br />
              Tablo üstündeki arama kutularına hasta ID veya tahmin sonucu yazarak tabloyu filtreleyebilirsiniz.
            </p>
            <p>
              <b>Analiz sonuçlarını bilgisayarıma indirebilir miyim?</b><br />
              Tablo altında bulunan <b>Verileri CSV Olarak İndir</b> butonunu kullanarak tüm kayıtları Excel/CSV formatında indirebilirsiniz.
            </p>
            <p>
              <b>Analiz sonucunun PDF raporunu nasıl alabilirim?</b><br />
              Her kaydın sağında yer alan <b>PDF</b> butonuna tıklayarak o kayda ait raporu PDF olarak indirebilirsiniz.
            </p>
            <p>
              <b>Kayıtları silebilir miyim?</b><br />
              İstediğiniz kaydın sağındaki kırmızı çöp kutusu butonuna tıklayarak kaydı silebilirsiniz.
            </p>
            <p>
              <b>Sonuçlar güvenilir mi?</b><br />
              Model eğitildiği veri kadar güvenilirdir, tıbbi kararlar için mutlaka doktor kontrolü gereklidir.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SSSModal;
