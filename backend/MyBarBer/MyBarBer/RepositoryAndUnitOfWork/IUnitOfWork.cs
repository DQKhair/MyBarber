namespace MyBarBer.Repository
{
    public interface IUnitOfWork : IDisposable
    {
        ICategoriesRepository Categories { get; }

        Task<bool> CompleteAsync();
    }
}
